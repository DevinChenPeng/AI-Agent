import { EventSourceMessage, getMessages, handleLines, parseEventStreamLineByLine } from './parse'

/**
 * fetch-event-stream 模块
 * 目标：在不直接使用原生 EventSource 的情况下，基于 fetch + ReadableStream 实现 SSE（Server-Sent Events）风格的消费。
 * 特点：
 *  1. 支持自定义 headers、重试策略、页面可见性自动断开/重连。
 *  2. 回调 onmessage 覆盖所有事件类型（包括自定义 event 字段）。
 *  3. 可通过 discardWhenOversize 丢弃过大消息，避免内存膨胀。
 *  4. 允许外部通过 AbortSignal 控制生命周期。
 *
 * 使用示例：
 *  const fes = new FetchEventStream('/sse', {
 *    headers: { Authorization: 'Bearer xxx' },
 *    onopen: async (res) => { console.log('连接成功') },
 *    onmessage: (msg) => { console.log(msg.data) },
 *    onerror: (err) => { console.error(err); return 1000 } // 返回重试间隔
 *  })
 *  await fes.start()
 *
 * TODO: 当前实现仍是骨架：缺少对 response.body 的逐行解析、重试时附带 last-event-id、以及 discardWhenOversize 的实际判断。
 *       后续可参考 parse.ts 中的解析工具，将流 reader 与事件分发整合到 create() 方法内。
 */
export const EventStreamContentType = 'text/event-stream'
// 默认重试间隔时间（毫秒）
const DEFAULT_RETRY_INTERVAL = 1000
// 最近一次事件的 ID（占位，后续用于重试时携带）
// const _lastEventId: string | null = null
export interface FetchEventSourceInit extends RequestInit {
  /**
   * 请求头；仅支持 Record<string,string> 形式。
   */
  headers?: Record<string, string>

  /**
   * 收到响应时调用，可用于校验响应是否符合预期（不符合时抛出异常）。
   * 若未提供，将采用默认校验：确认 Content-Type 为 text/event-stream。
   */
  onopen?: (response: Response) => Promise<void>

  /**
   * 每当收到一条消息都会触发。与浏览器原生 EventSource.onmessage 不同，
   * 该回调对“所有”事件都会调用，包括带自定义 event 字段的消息。
   */
  onmessage?: (ev: EventSourceMessage) => void

  /**
   * 响应（连接）结束时调用。如果不期望服务器主动关闭连接，可在此抛出异常，
   * 并在 onerror 中实现重试逻辑。
   */
  onclose?: () => void

  /**
   * 请求 / 解析消息 / 回调处理出现任意错误时调用。可用来控制重试策略：
   * 如果错误不可恢复，在回调中直接抛出以终止整体流程；
   * 否则返回一个毫秒数，表示等待该时间后自动按 last-event-id 重试。
   * 若未提供或返回 undefined，则视所有错误为可重试并在 1 秒后重试。
   */
  onerror?: (err: unknown) => number | null | undefined | void

  /**
   * 若为 true，即使页面（document）处于隐藏状态也保持连接不断开；
   * 默认行为是在页面隐藏时关闭连接，并在重新可见时自动重建。
   */
  openWhenHidden?: boolean

  /** 自定义 fetch 实现；默认使用 window.fetch */
  fetch?: typeof fetch

  /**
   * 若设置该值（字节数），超过此大小的消息将被丢弃。
   */
  discardWhenOversize?: boolean
}
export class FetchEventStream {
  // 事件流包装类：保存请求地址与初始化参数；负责连接生命周期管理与重试策略。
  private _url: RequestInfo
  private _options: FetchEventSourceInit
  private _headers: Record<string, string> = {}
  private _curRequestController: AbortController | null
  private _retryInterval = DEFAULT_RETRY_INTERVAL // 可动态调整（onerror 返回值）
  private _retryTimer = 0 // 重试定时器
  private _disposed = false // 标识实例是否已销毁，防止重复调用 dispose 以及在销毁后继续执行异步操作
  private _resolve?: () => void // 连接成功时调用，通知调用方
  private _reject?: (err: unknown) => void // 连接失败时调用，通知调用方
  constructor(url: RequestInfo, options: FetchEventSourceInit) {
    this._url = url
    this._options = options || {}
    this._headers = { ...(options.headers || {}) }
    this._curRequestController = null
    this.init()
  }
  start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      this.create()
    })
  }
  // 初始化
  init(): void {
    if (!this._headers.accept) {
      this._headers.accept = EventStreamContentType
    }
    // 监听外部 abort
    this._options.signal?.addEventListener('abort', () => this.abort())
    this.visibilitychange()
  }
  visibilitychange(): void {
    if (!this._options.openWhenHidden) {
      document.addEventListener('visibilitychange', this.onVisibilityChange)
    }
  }
  onVisibilityChange(): void {
    // 在每次可见性变化时关闭现有请求
    if (this._curRequestController) {
      this._curRequestController.abort()
      // 页面隐藏导致连接断开，触发 onclose
      if (document.hidden) {
        this._options.onclose?.()
      }
    }
    if (!document.hidden) {
      this.create() // 重新创建连接
    }
  }
  abort(): void {
    if (this._disposed) return
    // 主动中止连接，触发 onclose
    this._options.onclose?.()
    this.dispose()
  }
  private dispose(): void {
    if (this._disposed) return
    this._disposed = true
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
    window.clearTimeout(this._retryTimer)
    this._curRequestController?.abort()
  }
  async create(): Promise<void> {
    const { fetch: customFetch, onopen: inputOnOpen, onmessage, onclose, discardWhenOversize, ...rest } = this._options
    const onopen = inputOnOpen ?? FetchEventStream.defaultOnOpen
    const fetchImpl = customFetch ?? window.fetch
    if (this._disposed) return
    this._curRequestController = new AbortController()
    try {
      const response = await fetchImpl(this._url, {
        ...rest,
        headers: this._headers,
        signal: this._curRequestController.signal
      })
      await onopen(response)

      await parseEventStreamLineByLine(
        response.body!,
        handleLines(
          getMessages(
            id => {
              // console.log(id)
            },
            retry => {
              this._retryInterval = retry
            },
            onmessage
          )
        )
      )
      // 流正常结束，触发 onclose（服务器主动关闭连接）
      onclose?.()
      // 首次连接建立成功时通知调用方（resolve Promise）；后续重连不会再触发
      this._resolve?.()
    } catch (error) {
      const retryDelay = this.handleError(error)
      if (retryDelay != null && retryDelay >= 0 && !this._disposed) {
        this._retryTimer = window.setTimeout(() => this.create(), retryDelay)
      } else {
        this._reject?.(error)
      }
    }
  }
  static defaultOnOpen(response: Response): void {
    const contentType = response.headers.get('Content-Type') || ''
    if (!contentType.includes(EventStreamContentType)) {
      throw new Error(`Expected content-type to be ${EventStreamContentType}, but received ${contentType}`)
    }
  }
  private handleError(err: unknown): number | null | undefined {
    if (this._disposed) return null
    try {
      const maybe = this._options.onerror?.(err)
      // onerror 未返回值 -> 使用默认重试间隔
      if (maybe == null) return this._retryInterval
      // 返回数字 -> 使用该间隔
      return maybe
    } catch {
      // 回调中显式抛出 -> 视为致命错误
      return null
    }
  }
}
