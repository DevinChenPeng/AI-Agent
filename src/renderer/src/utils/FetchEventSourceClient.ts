import { FetchEventStream, EventStreamContentType } from './fetch-event-stream'

export interface SSEOptions extends RequestInit {
  headers?: Record<string, string>
  data?: Array<Record<string, unknown>> | Record<string, unknown> // post 时的数据
  openWhenHidden?: boolean // 是否在页面不可见时保持连接
}
// 可重连错误
class RetriableError extends Error {}

// 致命错误 不会重连
class FatalError extends Error {}
type SSEListener = (event?: unknown) => void

export class FetchEventSourceClient {
  private _url: string
  private _options: SSEOptions
  private _listenerMap: Map<string, SSEListener[]>
  private _eventStream?: FetchEventStream

  constructor(url: string, options: SSEOptions = {}) {
    this._url = url
    this._options = {
      method: 'GET',
      openWhenHidden: true,
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }
    if (options.data) {
      this._options.body = JSON.stringify(options.data)
      delete this._options.data
    }
    this._listenerMap = new Map()
    this.connect()
  }
  connect(): void {
    this._eventStream = new FetchEventStream(this._url, {
      ...this._options,
      onopen: async response => {
        if (response.ok && response.headers.get('content-type')?.startsWith(EventStreamContentType)) {
          console.log(response)
        } else if (response.status >= 400 && response.status < 500) {
          throw new FatalError(`SSE request failed: ${response.status} ${response.statusText}`)
        } else {
          throw new RetriableError(`SSE request failed: ${response.status} ${response.statusText}`)
        }
      },
      onclose: () => {
        throw new RetriableError('SSE connection closed')
      },
      onmessage: event => {
        // 分发到事件监听器池（预留扩展点）
        this._listenerMap.get('message')?.forEach(fn => fn(event))
      },
      onerror: error => {
        console.error('SSE error:', error)
      }
    })
    this._eventStream.start().catch(err => console.error('SSE start error:', err))
  }

  /** 主动关闭连接（用于组件卸载/切换页面等情况的清理） */
  close(): void {
    try {
      console.log(11112222)

      this._eventStream?.abort()
    } catch (e) {
      console.error('SSE close error:', e)
    }
  }
}
