import useSinglePostSSEClient from '@renderer/hooks/useSinglePostSSEClient'
import { useMount } from '@renderer/hooks/useMount'
import SSEClient from '@renderer/utils/SSEClient'

// 定义返回值类型
type UseBaseHooksReturn = {
  sseClient: SSEClient
}

export const useBaseHooks = (): UseBaseHooksReturn => {
  const url = 'https://qa-tyxk.meosedge.com/meos-control-server-edge/server-event/sse/subscribe?PAGE_BROADCAST'
  const { sseClient, openSSEClient } = useSinglePostSSEClient(url)
  openSSEClient({
    method: 'POST',
    data: [
      {
        subscribeType: 'ACAH',
        projectId: 'Pj9522457558',
        instanceId: 'Pj9522457558',
        instanceType: 'PROJECT',
        eventParamMap: {
          PAGE_BROADCAST: {
            firstLevelCategory: 'airConditioningHeatSource',
            secondLevelCategory: 'Sy95224575581839195333061849066'
          }
        },
        eventType: ['PAGE_BROADCAST']
      }
    ],
    headers: {
      'project-id': 'Pj9522457558',
      'group-code': 'TYXK',
      groupCode: 'TYXK',
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJkZXZpY2VUeXBlIjoxLCJhdWQiOiJ5dXNodS1zYWFzLWNsaWVudCIsInN1YiI6Inl1c2h1LXVzZXIiLCJhY2NvdW50SWQiOiIxNTA5ODMyMjM3NjE3MTgwNjc0IiwiYWNjb3VudE5hbWUiOiIxODA4ODg4ODEwMCIsImFjY291bnRUeXBlIjoiMiIsImlzcyI6Inl1c2h1IiwianRpIjoiNTMyNjY5MDMtNWQ2Zi00MDUyLWJmNzYtMzQ2YTI2YTUzOTExIn0.wM1XXhdqjFxvkIu6xCEnlcINfzkvSEtEtLKlQtmdoKY'
    }
  })
  sseClient.addEventListener('PAGE_BROADCAST', event => {
    console.log(event?.data)
  })
  return { sseClient }
}
