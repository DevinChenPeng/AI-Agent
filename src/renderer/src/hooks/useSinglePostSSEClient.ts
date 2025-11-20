import { SSEOptions } from '@renderer/utils/FetchEventSourceClient'
import SSEClient from '@renderer/utils/SSEClient'
import { useEffect, useRef } from 'react'

export default (url: string): { sseClient: SSEClient; openSSEClient: (options: SSEOptions) => void } => {
  // 使用 useRef 确保 SSEClient 实例在组件生命周期内保持稳定
  const clientRef = useRef<SSEClient | null>(null)

  // 初始化 client（只在首次渲染时执行）
  if (!clientRef.current) {
    clientRef.current = new SSEClient(url, {})
  }

  const setSSEClientOption = (options: SSEOptions): void => {
    clientRef.current?.setOptions(options)
  }

  useEffect(() => {
    // 组件卸载时清理资源
    return () => {
      clientRef.current?.destroy()
      clientRef.current = null
    }
  }, []) // 依赖数组为空，只在组件卸载时执行清理

  return {
    sseClient: clientRef.current,
    openSSEClient: setSSEClientOption
  }
}
