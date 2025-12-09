import { Build, HttpResponse } from '@renderer/types/common'
import http from '@renderer/utils/http'
import { AxiosRequestConfig, CancelToken } from 'axios'
export const treeBuildingFloorSpace = (
  config?: AxiosRequestConfig<{ cancelToken: CancelToken }>
): HttpResponse<Build[]> =>
  http.post(
    'https://qa-gw.meos.net.cn/meos-control-server/instance/treeBuildingFloorSpace',
    { isQuerySpace: false },
    { ...config }
  )
