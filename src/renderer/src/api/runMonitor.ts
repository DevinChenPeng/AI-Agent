import { ToiletItem } from '@renderer/pages/runMonitor/types'
import { HttpResponse } from '@renderer/types/common'
import http from '@renderer/utils/http'
import { AxiosRequestConfig, CancelToken } from 'axios'

export const TOILET = (
  data: unknown,
  config?: AxiosRequestConfig<{ cancelToken: CancelToken }>
): HttpResponse<ToiletItem[]> =>
  http.post('https://qa-gw.meos.net.cn/meos-control-server/instance/listDashboardSpaces/TOILET', data, { ...config })
