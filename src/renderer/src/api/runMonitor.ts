import { ToiletSpaceItem } from '@renderer/pages/runMonitor/types'
import { HttpResponse, EquipmentDetail } from '@renderer/types/common'
import http from '@renderer/utils/http'
import { AxiosRequestConfig, CancelToken } from 'axios'

export const TOILET = (
  data: unknown,
  config?: AxiosRequestConfig<{ cancelToken: CancelToken }>
): HttpResponse<ToiletSpaceItem[]> =>
  http.post('https://qa-gw.meos.net.cn/meos-control-server/instance/listDashboardSpaces/TOILET', data, { ...config })

export const listInfoCodeConfigsByObjectId = (
  data: unknown,
  config?: AxiosRequestConfig<{ cancelToken: CancelToken }>
): HttpResponse<EquipmentDetail[]> =>
  http.post('https://qa-gw.meos.net.cn/meos-control-server/infoCodeConfig/listInfoCodeConfigsByObjectId', data, {
    ...config
  })
