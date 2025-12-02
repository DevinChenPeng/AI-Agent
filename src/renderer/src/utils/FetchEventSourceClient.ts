import { FetchEventStream, EventStreamContentType } from './fetch-event-stream'
import { EventSourceMessage } from './fetch-event-stream/parse'

// SSE请求选项接口，继承自RequestInit
export interface SSEOptions extends RequestInit {
  headers?: Record<string, string>
  data?: Array<Record<string, unknown>> | Record<string, unknown> // POST请求时发送的数据
  openWhenHidden?: boolean // 是否在页面不可见时保持连接
  params?: Record<string, string> // URL查询参数
}

/**
 * 可重试错误类
 * 用于表示可以重新连接的错误情况
 */
class RetriableError extends Error {}

/**
 * 致命错误类
 * 用于表示无法恢复的错误，不会触发重连
 */
class FatalError extends Error {}

// 替换原有 SSEListenerParams 定义如下：

export type SSEListenerParams = Omit<EventSourceMessage, 'data'> & {
  data: Record<string, any> | string
}

// SSE事件监听器类型定义
export type SSEListener = (event?: SSEListenerParams) => void

/**
 * FetchEventSourceClient 类
 * 基于Fetch API实现的SSE客户端，用于处理服务器推送事件
 */
export class FetchEventSourceClient {
  private _url: string // SSE服务端URL
  private _options: SSEOptions // 请求配置选项
  private _listenerMap: Map<string, SSEListener[]> // 事件监听器映射表
  private _eventStream?: FetchEventStream // 事件流实例

  /**
   * 构造函数
   * @param url - SSE服务端地址
   * @param options - 请求配置选项
   */
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

    // 如果有数据则转换为JSON字符串并设置到body中
    if (options.data) {
      this._options.body = JSON.stringify(options.data)
      delete this._options.data
    }

    this._listenerMap = new Map()
    this.connect()
  }

  /**
   * 建立SSE连接
   */
  connect(): void {
    this._eventStream = new FetchEventStream(this._url, {
      ...this._options,
      onopen: async response => {
        // 检查响应是否成功且内容类型正确
        if (response.ok && response.headers.get('content-type')?.startsWith(EventStreamContentType)) {
          this._triggerEvent('open', response as unknown as EventSourceMessage)
          return
        }
        // 客户端错误(4xx)视为致命错误
        else if (response.status >= 400 && response.status < 500) {
          throw new FatalError(`SSE request failed: ${response.status} ${response.statusText}`)
        }
        // 服务器错误(5xx)视为可重试错误
        else {
          throw new RetriableError(`SSE request failed: ${response.status} ${response.statusText}`)
        }
      },
      onclose: () => {
        // 连接关闭时抛出可重试错误
        throw new RetriableError('SSE connection closed')
      },
      onmessage: msg => {
        const { event } = msg
        // 处理致命错误事件
        if (event === 'FatalError') {
          console.error('onmessage FatalError>>>>', msg.data)
          throw new FatalError(msg.data)
        }

        // 触发对应事件的监听器
        if (event) {
          this._triggerEvent(event, msg)
        }
      },
      onerror: error => {
        console.error('SSE error:', error)
      }
    })

    // 启动事件流并捕获启动错误；主动关闭（AbortError）时静默忽略
    this._eventStream.start().catch(err => {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return
      }

      console.error('FetchEventStream start error:', err)
    })
  }

  /**
   * 触发指定事件的所有监听器
   * @param eventName - 事件名称
   * @param data - 事件数据
   */
  _triggerEvent(eventName: string, data: EventSourceMessage): void {
    try {
      const listeners = this._listenerMap.get(eventName)
      if (listeners) {
        listeners.forEach(listener => {
          listener(data)
        })
      }
    } catch (err) {
      console.error('triggerEvent error>>>', err)
    }
  }

  /**
   * 添加事件监听器
   * @param eventName - 事件名称
   * @param listener - 监听器回调函数
   */
  addEventListener(eventName: string, listener: SSEListener): void {
    console.log(eventName)

    if (!this._listenerMap.has(eventName)) {
      this._listenerMap.set(eventName, [])
    }
    this._listenerMap.get(eventName)?.push(listener)
  }

  /**
   * 移除事件监听器
   * @param eventName - 事件名称
   * @param listener - 要移除的监听器回调函数
   */
  removeEventListener(eventName: string, listener: SSEListener): void {
    if (this._listenerMap.has(eventName)) {
      const listeners = this._listenerMap.get(eventName)
      const index = listeners?.indexOf(listener)
      if (index !== -1) {
        listeners?.splice(index!, 1)
      }
    }
  }

  /**
   * 主动关闭连接
   * 用于组件卸载/切换页面等情况的清理
   */
  close(): void {
    try {
      this._eventStream?.abort()
      this._listenerMap.clear()
    } catch (e) {
      console.error('SSE close error:', e)
    }
  }
}
