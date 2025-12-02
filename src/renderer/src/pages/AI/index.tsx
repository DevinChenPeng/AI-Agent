import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'
import styles from './index.module.less'
import ChatContainer from './components/chat/ChatContainer'
import { cn } from '@renderer/utils/classNames'
const { AI_list_container, is_new, name, chat_list } = styles

interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const { chatList, onSendMessage } = useBaseHooks()
  const isNew = chatList.length === 0
  const list = chatList.map((item, index) => <div key={index}>{item.question}</div>)
  return (
    <div className={cn(AI_list_container, isNew ? [is_new, 'flcc'] : 'flcc')}>
      {isNew ? null : <div className={cn(chat_list)}>{list}</div>}
      {isNew ? <div className={cn(name)}>您好，🌈啊哦额</div> : null}
      <ChatContainer onSendMessage={onSendMessage} />
    </div>
  )
}

export default ComponentName
