import useSinglePostSSEClient from '@renderer/hooks/useSinglePostSSEClient'
import { Chats } from '@renderer/types/chat'
import { SSEListenerParams } from '@renderer/utils/FetchEventSourceClient'
import { messageEvent } from '@renderer/utils/sse-events'
import { useEffect, useState } from 'react'
// 定义返回值类型
type UseBaseHooksReturn = {
  chatList: Chats
  setChatList: (chatList: Chats) => void
  onSendMessage: (question: string) => void
}
export const useBaseHooks = (): UseBaseHooksReturn => {
  // 定义 chatList 状态
  const [chatList, setChatList] = useState<Chats>([])
  const onSendMessage = (question: string): void => {
    setChatList(arr => {
      console.log('arr', arr)
      return [...arr, { question, message: '' }]
    })
  }
  // 创建 chartSSEClient 实例
  const chartSSEClient = useSinglePostSSEClient('http://localhost:1234/api/llm/chart')
  // 定义 eventFn 函数
  const eventFn = (event?: SSEListenerParams): void => messageEvent(event, () => {})
  // 添加事件监听器
  useEffect(() => {
    chartSSEClient?.addEventListener('message', eventFn)
    return () => chartSSEClient?.removeEventListener('message', eventFn) // 添加移除事件监听器的逻辑
  }, [chartSSEClient])

  return { chatList, setChatList, onSendMessage }
}
