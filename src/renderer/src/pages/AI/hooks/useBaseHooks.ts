import useSinglePostSSEClient from '@renderer/hooks/useSinglePostSSEClient'
import SSEClient from '@renderer/utils/SSEClient'
import { useEffect, useRef, useState } from 'react'
// 定义返回值类型
type UseBaseHooksReturn = {
  connect: () => void
  connect2: () => void
  close: () => void
  markdown: string
  text: string
  setText: (text: string) => void
  listRef: React.RefObject<HTMLDivElement | null>
}
const PAGE_BROADCAST = (event): void => {
  console.log(event)
}
export const useBaseHooks = (): UseBaseHooksReturn => {
  const [markdown, setMarkdown] = useState('')
  const [text, setText] = useState('')
  const listRef = useRef<HTMLDivElement | null>(null)
  const pageSSEClient = useSinglePostSSEClient(
    'https://qa-tyxk.meosedge.com/meos-control-server-edge/server-event/sse/subscribe?PAGE_BROADCAST'
  )
  const chartSSEClient = useSinglePostSSEClient('http://localhost:1234/api/llm/chart')
  useEffect(() => {
    pageSSEClient?.addEventListener('PAGE_BROADCAST', PAGE_BROADCAST)
  }, [pageSSEClient])

  useEffect(() => {
    chartSSEClient?.addEventListener('message', event => {
      const data = event?.data
      console.log(data)
      if (data && typeof data === 'object' && 'message' in data) {
        const message = (data as Record<string, unknown>).message
        if (typeof message === 'string') {
          setMarkdown(prev => prev + message)
        }
      }
      listRef.current?.scrollTo(0, listRef.current.scrollHeight)
    })
  }, [chartSSEClient])
  const connect = (): void => {
    pageSSEClient?.setOptions({
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

    console.log(pageSSEClient)
  }
  const connect2 = (): void => {
    if (!text) {
      return
    }
    chartSSEClient?.setOptions({
      method: 'POST',
      data: {
        text
      }
    })
  }
  const close = (): void => {
    chartSSEClient?.close()
  }
  return { connect, connect2, markdown, close, text, setText, listRef }
}
