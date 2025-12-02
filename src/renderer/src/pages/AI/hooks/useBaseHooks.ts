import useSinglePostSSEClient from '@renderer/hooks/useSinglePostSSEClient'
import { ChatMessage, Chats } from '@renderer/types/chat'
import { SSEListenerParams } from '@renderer/utils/FetchEventSourceClient'
import { createSseConfig, endEvent, messageEvent, startEvent } from '@renderer/utils/sse-events'
import { useEffect, useRef, useState } from 'react'
import { uniqueId } from 'lodash'
// 定义返回值类型
type UseBaseHooksReturn = {
  chatList: Chats
  setChatList: (chatList: Chats) => void
  onSendMessage: (question: string) => void
}
export const useBaseHooks = (): UseBaseHooksReturn => {
  // 定义 chatList 状态
  const [chatList, setChatList] = useState<Chats>([])

  const messageRef = useRef<ChatMessage>({
    id: '',
    question: '',
    message: ''
  }) // 消息参考

  // 创建 chartSSEClient 实例
  const chartSSEClient = useSinglePostSSEClient('http://localhost:1234/api/llm/chart')
  // 定义 messageFn 函数
  const messageFn = (event?: SSEListenerParams): void =>
    messageEvent(event, (message: string) => {
      // 将 SSE 推送的内容拼接到缓存中
      messageRef.current.message = `${messageRef.current.message ?? ''}${message}`
      setChatList(prev =>
        prev.map(chat => (chat.id === messageRef.current.id ? { ...chat, message: messageRef.current.message } : chat))
      )
    })
  const endFn = (): void =>
    endEvent(() => {
      // 推送结束后清空缓存，等待下一次推送
      messageRef.current = { id: '', question: '', message: '' }
    })
  const startFn = (event?: SSEListenerParams): void =>
    startEvent(event, (id: string) => {
      // 初始化一条新的回答消息，并立即插入 chatList 以实现流式渲染
      messageRef.current = {
        id,
        question: '',
        message: ''
      }
      setChatList(prev => [...prev, { ...messageRef.current }])
    })
  // 添加事件监听器
  useEffect(() => {
    chartSSEClient?.addEventListener('message', messageFn)
    chartSSEClient?.addEventListener('end', endFn)
    chartSSEClient?.addEventListener('start', startFn)
    return () => {
      chartSSEClient?.removeEventListener('message', messageFn)
      chartSSEClient?.removeEventListener('end', endFn)
      chartSSEClient?.removeEventListener('start', startFn)
    } // 添加移除事件监听器的逻辑
  }, [chartSSEClient])
  const onSendMessage = (question: string): void => {
    setChatList(prev => [...prev, { id: uniqueId('chat_'), question, message: '' }])
    chartSSEClient?.send(createSseConfig(question))
  }

  return { chatList, setChatList, onSendMessage }
}
