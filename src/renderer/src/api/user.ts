import { HttpResponse, BaseResponse } from '@renderer/types/common'
import http from '@renderer/utils/http'
export const getUserInfo = (): HttpResponse<{ data: Record<string, unknown> }> =>
  http.get('https://m1.apifoxmock.com/m1/5622601-5302169-default/ai-autorun-agent/strategy/detail')
