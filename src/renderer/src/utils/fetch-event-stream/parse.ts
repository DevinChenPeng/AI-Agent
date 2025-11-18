export interface EventSourceMessage {
  // 事件ID
  id: string
  // 事件类型
  event: string
  data: string
  retry?: number
  size?: string
}
function newMessage(): EventSourceMessage {
  // data, event, and id must be initialized to empty strings:
  // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
  // retry should be initialized to undefined so we return a consistent shape
  // to the js engine all the time: https://mathiasbynens.be/notes/shapes-ics#takeaways
  return {
    data: '',
    event: '',
    id: '',
    retry: undefined
  }
}
