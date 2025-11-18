import { HttpResponse } from '@renderer/types/common'
import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios'

class Http {
  private instance: AxiosInstance
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config)
    this.init()
  }
  public init(): void {
    this.instance.interceptors.request.use(Http.requestResolve, Http.requestReject)
    this.instance.interceptors.response.use(Http.responseResolve, Http.responseReject)
  }
  static requestResolve(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    return config
  }
  static requestReject(error: unknown): Promise<unknown> {
    return Promise.reject(error)
  }
  static responseResolve(response: AxiosResponse): AxiosResponse {
    return response.data || {}
  }
  static responseReject(error: AxiosResponse): Promise<AxiosResponse> {
    return Promise.reject(error)
  }
  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): HttpResponse<T> {
    return this.instance.post(url, data, config)
  }
  public get<T>(url: string, config?: AxiosRequestConfig): HttpResponse<T> {
    return this.instance.get(url, config)
  }
  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): HttpResponse<T> {
    return this.instance.put(url, data, config)
  }
  public delete<T>(url: string, config?: AxiosRequestConfig): HttpResponse<T> {
    return this.instance.delete(url, config)
  }
}

const BASE_CONFIG: CreateAxiosDefaults = {
  baseURL: '',
  timeout: 0, // 0表示无超时
  headers: {
    'Content-Type': 'application/json'
  },
  // 转换请求数据
  transformRequest: [
    (data, headers) => {
      // 如果是FormData，不做转换
      if (data instanceof FormData) return data

      const contentType = headers['Content-Type']

      // 处理JSON类型
      if (typeof contentType === 'string' && contentType.includes('application/json')) {
        return JSON.stringify(data)
      }
      // 处理表单类型
      if (typeof contentType === 'string' && contentType.includes('application/x-www-form-urlencoded')) {
        const formData = new URLSearchParams()
        Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)))
        return formData
      }
      return data
    }
  ],
  // 转换响应数据
  transformResponse: [
    data => {
      if (typeof data === 'string') {
        try {
          return JSON.parse(data)
        } catch (e) {
          /* 非JSON字符串不转换 */
          console.log(e)
        }
      }
      return data
    }
  ],
  // 验证响应状态码（默认2xx为成功）
  validateStatus: status => status >= 200 && status < 300,
  // 请求取消信号
  signal: undefined
}
export default new Http(BASE_CONFIG)
