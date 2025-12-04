import { createSseConfig } from '@renderer/utils/sse-events'
import SSEClient from '@renderer/utils/SSEClient'
import { useEffect, useMemo } from 'react'

interface UseSinglePostSSEClient {
  sseClient: SSEClient
  send: (text: string) => void
}
export default (url: string): UseSinglePostSSEClient => {
  const sseClient = useMemo(() => {
    return new SSEClient(url)
  }, [url]) // URL 变化时会重新创建

  useEffect(() => {
    return () => {
      sseClient.destroy()
    }
  }, [sseClient])

  const send = (text: string): void => {
    sseClient?.send(createSseConfig(text))
  }

  return { sseClient, send }
}
