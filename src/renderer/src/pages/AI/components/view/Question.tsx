import { FC } from 'react'
import styles from './question.module.less'
import { cn } from '@renderer/utils/classNames'
const { question } = styles
interface ComponentNameProps {
  question: string
}

const Question: FC<ComponentNameProps> = props => {
  return <div className={cn(question)}>{props.question}</div>
}

export default Question
