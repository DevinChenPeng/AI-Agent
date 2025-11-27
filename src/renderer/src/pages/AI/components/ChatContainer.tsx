import { FC } from 'react'
import styles from './chat.module.less'
import { cn } from '@renderer/utils/classNames'
const { chat_container } = styles
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const Input = <input className={cn(styles.input)} placeholder="Type a message..." />
  return <div className={cn(chat_container)}>{Input}</div>
}

export default ComponentName
