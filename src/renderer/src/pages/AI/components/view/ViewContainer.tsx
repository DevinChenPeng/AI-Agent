import { FC } from 'react'
import styles from './view.module.less'
import { cn } from '@renderer/utils/classNames'
import { ChatMessage } from '@renderer/types/chat'
import Question from './Question'
import Think from './Think'
import Answer from './Answer'
const { container } = styles
interface ComponentNameProps {
  data: ChatMessage
}
const ViewContainer: FC<ComponentNameProps> = props => {
  const { question, message, think } = props.data
  return (
    <div className={cn(container, 'w-full')}>
      {question ? <Question question={question}></Question> : null}
      {think.startName ? (
        <Think content={think?.content} startName={think?.startName} endName={think?.endName} />
      ) : null}
      {message ? <Answer message={message} /> : null}
    </div>
  )
}

export default ViewContainer
