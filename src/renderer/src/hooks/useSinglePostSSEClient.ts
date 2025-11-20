import SSEClient from '@renderer/utils/SSEClient'
import { useEffect, useState } from 'react'

export default (url: string): SSEClient | null => {
  const [sseClient, setSSEClient] = useState(null as SSEClient | null)
  useEffect(() => {
    setSSEClient(new SSEClient(url))
    // 组件卸载时清理资源
    return () => {
      sseClient?.destroy()
    }
  }, []) // 依赖数组为空，只在组件卸载时执行清理

  return sseClient
}
