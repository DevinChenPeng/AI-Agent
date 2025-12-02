import { FC } from 'react'
import styles from './view.module.less'
import { cn } from '@renderer/utils/classNames'
import { ChatMessage } from '@renderer/types/chat'
import Question from './Question'
import Think from './Think'
const { container } = styles
interface ComponentNameProps {
  data: ChatMessage
}
const ViewContainer: FC<ComponentNameProps> = props => {
  const { question, message } = props.data
  return (
    <div className={cn(container, 'w-full')}>
      {question ? <Question question={question}></Question> : null}
      {message ? <Think message={message}></Think> : null}
    </div>
  )
}

export default ViewContainer
