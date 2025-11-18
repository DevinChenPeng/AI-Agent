import { FetchEventStream, EventStreamContentType } from './fetch-event-stream'
import { EventSourceMessage } from './fetch-event-stream/parse'

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
      onmessage: msg => {
        const { event } = msg
        if (event === 'FatalError') {
          console.error('onmessage FatalError>>>>', msg.data)
          throw new FatalError(msg.data)
        }

        if (event) {
          this._triggerEvent(event, msg)
        }
      },
      onerror: error => {
        console.error('SSE error:', error)
      }
    })
    this._eventStream.start().catch(err => console.error('SSE start error:', err))
  }
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
  addEventListener(eventName: string, listener: SSEListener): void {
    if (!this._listenerMap.has(eventName)) {
      this._listenerMap.set(eventName, [])
    }
    this._listenerMap.get(eventName)?.push(listener)
  }

  removeEventListener(eventName: string, listener: SSEListener): void {
    if (this._listenerMap.has(eventName)) {
      const listeners = this._listenerMap.get(eventName)
      const index = listeners?.indexOf(listener)
      if (index !== -1) {
        listeners?.splice(index!, 1)
      }
    }
  }
  /** 主动关闭连接（用于组件卸载/切换页面等情况的清理） */
  close(): void {
    try {
      this._eventStream?.abort()
      this._listenerMap.clear()
    } catch (e) {
      console.error('SSE close error:', e)
    }
  }
}
