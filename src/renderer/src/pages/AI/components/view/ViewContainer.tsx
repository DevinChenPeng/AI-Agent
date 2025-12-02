import { FC } from 'react'
import styles from './chat.module.less'
import { cn } from '@renderer/utils/classNames'
const { container } = styles
interface ComponentNameProps {
  contextList: Array<unknown>
}
const ViewContainer: FC<ComponentNameProps> = props => {
  return <div className={cn(container)}></div>
}

export default ViewContainer
