import { BaseObject } from './common'

/**
 * 聊天消息接口
 * @property {string} [id] - 消息ID（继承自BaseObject）
 * @property {string} [name] - 消息名称（继承自BaseObject）
 * @property {string} question - 用户提问内容
 * @property {string} message - AI回复消息
 * @property {Think} think - 思考过程信息
 */
export interface ChatMessage extends Partial<BaseObject> {
  question: string
  message: string
  think: Think
}

/**
 * 思考过程接口
 * @property {string} content - 思考内容
 * @property {string} startName - 思考开始标识名称
 * @property {string} endName - 思考结束标识名称
 */
export interface Think {
  content: string
  startName: string
  endName: string
}

/**
 * SSE事件类型枚举
 * @enum {string}
 * @property {string} TEXT - 普通文本消息
 * @property {string} THINK_START - 思考开始事件
 * @property {string} THINK_END - 思考结束事件
 * @property {string} THINK - 思考过程事件
 * @property {string} CONVERSATION - 对话事件
 * @property {string} START - 会话开始事件
 * @property {string} END - 会话结束事件
 */
export enum SSE_TYPE_ENUMS {
  TEXT = 'text',
  THINK_START = 'think-start',
  THINK_END = 'think-end',
  THINK = 'think',
  CONVERSATION = 'conversation',
  START = 'start',
  END = 'end'
}

/**
 * 聊天消息数组类型
 */
export type Chats = Array<ChatMessage>

/**
 * SSE事件数据接口
 * @property {string} [id] - 事件ID（可选）
 * @property {string} [content] - 事件内容（可选）
 * @property {SSE_TYPE_ENUMS} type - 事件类型
 */
export type EventData = {
  id?: string
  content?: string
  type: SSE_TYPE_ENUMS
}
