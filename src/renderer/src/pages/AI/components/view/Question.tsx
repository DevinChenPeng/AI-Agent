import { FC } from 'react'
import styles from './question.module.less'
import { cn } from '@renderer/utils/classNames'
const { question, question_content } = styles
interface ComponentNameProps {
  question: string
}

const Question: FC<ComponentNameProps> = props => {
  return (
    <div className={cn(question)}>
      <div className={cn(question_content)}>{props.question}</div>
    </div>
  )
}

export default Question
