import { ChatMessage, Chats, EventData } from '@renderer/types/chat'
import { SSEListenerParams } from '@renderer/utils/FetchEventSourceClient'
import { messageEvent } from '@renderer/utils/sse-events'
import { useEffect, useRef, useState } from 'react'
import { uniqueId } from 'lodash'
import useSinglePostSSEClient from '@renderer/hooks/useSinglePostSSEClient'
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
    think: {
      content: '',
      startName: '',
      endName: ''
    },
    message: ''
  }) // 消息参考
  const { sseClient, send } = useSinglePostSSEClient('http://localhost:1234/api/llm/chart')
  const messageFn = (event?: SSEListenerParams): void =>
    messageEvent(event, (data: EventData) => {
      // 将 SSE 推送的内容拼接到缓存中
      console.log(data)
      if (data.type === 'think-start') {
        messageRef.current.think.content = ''
        messageRef.current.think.startName = data.content!
      }
      if (data.type === 'think') {
        messageRef.current.think.content += data.content
      }
      if (data.type === 'think-end') {
        messageRef.current.think.endName = data.content!
      }
      if (data.type === 'text') {
        messageRef.current.message = `${messageRef.current.message ?? ''}${data.content}`
      }
      setChatList(prev =>
        prev.map(chat => {
          if (chat.id === messageRef.current.id) {
            return { ...chat, message: messageRef.current.message, think: messageRef.current.think }
          }
          return chat
        })
      )
    })
  useEffect(() => {
    if (sseClient) {
      sseClient.addEventListener('message', messageFn)
    }
    return () => {
      if (sseClient) {
        sseClient.removeEventListener('message', messageFn)
      }
    }
  }, [])

  const onSendMessage = (question: string): void => {
    const id = uniqueId('chat_')
    messageRef.current.id = id
    messageRef.current.question = question
    messageRef.current.message = ''
    setChatList(prev => [...prev, { id, question, message: '', think: messageRef.current.think }])
    send(question)
  }

  return { chatList, setChatList, onSendMessage }
}
