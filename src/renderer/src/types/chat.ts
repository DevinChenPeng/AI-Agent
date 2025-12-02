import { BaseObject } from './common'

export interface ChatMessage extends Partial<BaseObject> {
  question: string
  message?: string
}

export type Chats = Array<ChatMessage>
