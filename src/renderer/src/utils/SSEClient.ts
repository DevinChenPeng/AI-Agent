import { EventSourceMessage } from './fetch-event-stream/parse'
import { FetchEventSourceClient, SSEListener, SSEListenerParams, SSEOptions } from './FetchEventSourceClient'
import qs from 'qs'

const getURLInstance = (url: string): URL => {
  try {
    return new URL(url)
  } catch (e) {
    return new URL(window.location.origin + url)
  }
}
type SSEClientEvents = {
  isAdd: boolean
  listenerHandler: ((event: EventSourceMessage) => void) | null
  listeners: SSEListener[]
}

export default class SSEClient {
  private url: string
  private options: SSEOptions = {}
  private open: boolean
  private isDestroy: boolean
  private eventsMap: Map<string, SSEClientEvents>
  private client: FetchEventSourceClient | null = null
  // SSE客户端主类
  constructor(url: string, options: SSEOptions = {}) {
    this.open = false
    this.isDestroy = false
    this.url = url
    this.eventsMap = new Map()
    this.init(options)
  }
  init(options: SSEOptions = {}): void {
    if (!this.url) {
      return
    }
    this.options = SSEClient.setHeaders(options)
    this.url = SSEClient.setUrl(this.url, this.options)
  }
  send(options: SSEOptions = {}, url?: string): void {
    if (this.isDestroy) return
    url && (this.url = url)
    this.close()
    this.init(options)
    this.connect()
  }
  static setHeaders(options: SSEOptions = {}): SSEOptions {
    // to do 设置请求头
    return options
  }
  /**
   * 设置并更新当前实例的URL地址
   * 该函数会解析原始URL，合并查询参数，并重新构建完整的URL地址
   *
   * @returns {void} 无返回值，直接修改实例的url属性
   */
  static setUrl(url: string, options: SSEOptions = {}): string {
    let finallyUrl = ''
    try {
      // 解析URL并合并查询参数
      const urlInstnce = getURLInstance(url)
      const paramsOrigin = qs.parse(urlInstnce.search, { ignoreQueryPrefix: true })
      const paramsString = `${qs.stringify({ ...paramsOrigin, ...(options.params || {}) })}`

      // 根据是否存在查询参数来构建最终的URL
      if (paramsString) {
        finallyUrl = `${urlInstnce.origin}${urlInstnce.pathname}?${paramsString}`
      } else {
        finallyUrl = `${urlInstnce.origin}${urlInstnce.pathname}`
      }
    } catch (e) {
      console.error(e)
    }
    // 确保URL被正确设置，如果处理失败则保持原URL不变
    return finallyUrl || url
  }
  _sseHandler(eventName: string, event: SSEListenerParams): void {
    if (!this.eventsMap) {
      return
    }
    const { listeners } = this.eventsMap.get(eventName)!
    if (typeof event.data === 'string') {
      try {
        const data = JSON.parse(event.data)
        event.data = data
        listeners.forEach(cb => {
          cb(event)
        })
      } catch (error) {
        console.log('event.data is no JSON', error)
        console.log(event.data)

        listeners.forEach(cb => {
          cb(event)
        })
      }
    } else {
      listeners.forEach(cb => {
        cb(event)
      })
    }
  }
  addEventListener(eventName: string, listener: SSEListener): void {
    if (!this.eventsMap) return console.warn('SSEClient 已被销毁')
    if (!this.eventsMap.get(eventName)) {
      this.eventsMap.set(eventName, {
        isAdd: false,
        listenerHandler: null,
        listeners: []
      })
    }
    const eventInfo = this.eventsMap.get(eventName)
    if (eventInfo) {
      const { listeners } = eventInfo
      if (!eventInfo?.isAdd) {
        const cb: SSEListener = event => {
          event && this._sseHandler(eventName, event)
        }
        eventInfo.listenerHandler = cb
        this.client?.addEventListener(eventName, cb)
        eventInfo.isAdd = true
      }

      if (listeners.indexOf(listener) === -1) {
        listeners.push(listener)
      }
    }
  }
  removeEventListener(eventName: string, listener: SSEListener): void {
    if (!this.eventsMap) return console.warn('SSEClient 已被销毁')
    const eventInfo = this.eventsMap.get(eventName)
    if (eventInfo) {
      const { listeners } = eventInfo
      if (listeners) {
        const index = listeners.indexOf(listener)
        if (index !== -1) {
          listeners.splice(index, 1)
        }
        if (listeners.length === 0) {
          const cb = eventInfo.listenerHandler as SSEListener
          this.client?.removeEventListener(eventName, cb)
          eventInfo.isAdd = false
        }
      }
    }
  }
  _initAddEvents(): void {
    if (!this.eventsMap) return console.warn('SSEClient 已被销毁')
    this.eventsMap.forEach((eventInfo, eventName) => {
      eventInfo.isAdd = false
      const { listeners } = eventInfo
      listeners.forEach(callback => {
        this.addEventListener(eventName, callback)
      })
    })
  }
  connect(): void {
    if (this.open || this.isDestroy) {
      return
    }
    this.client = new FetchEventSourceClient(this.url, this.options)
    this.client.addEventListener('open', () => {
      this.open = true
    })
    this.client?.addEventListener('error', event => {
      console.warn('Connection error:', event)
    })
    console.log(this.eventsMap)

    this._initAddEvents()
  }
  close(): void {
    this.open = false
    this.client?.close()
  }
  destroy(): void {
    this.close()
    this.client = null
    this.eventsMap.clear()
    this.eventsMap = new Map()
    this.isDestroy = true
  }
}
