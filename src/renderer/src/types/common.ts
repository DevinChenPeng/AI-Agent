export interface BaseResponse<T> {
  [x: string]: unknown
  code: string
  data: T
  message?: string
}
export type HttpResponse<T> = Promise<BaseResponse<T>>
