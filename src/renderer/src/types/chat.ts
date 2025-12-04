import { BaseObject } from './common'

export interface ChatMessage extends Partial<BaseObject> {
  question: string
  message: string
  think: Think
}

export interface Think {
  content: string
  startName: string
  endName: string
}
export enum SSE_TYPE_ENUMS {
  TEXT = 'text',
  THINK_START = 'think-start',
  THINK_END = 'think-end',
  THINK = 'think',
  CONVERSATION = 'conversation',
  START = 'start',
  END = 'end'
}

export type Chats = Array<ChatMessage>

export type EventData = {
  id?: string
  content?: string
  type: SSE_TYPE_ENUMS
}
