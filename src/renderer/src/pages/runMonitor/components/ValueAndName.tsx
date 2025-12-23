import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/valuename.module.less'

export interface ValueAndNameProps {
  value: string
  name: string
  infoCode?: string
  sequence?: number
}

const ValueAndName: FC<ValueAndNameProps> = props => {
  return (
    <div className={cn(styles.value_and_name)}>
      <div className={cn(styles.value, 'text-16 f-w-700')}>{props.value}</div>
      <div className={cn(styles.name)}>{props.name}</div>
    </div>
  )
}

export default ValueAndName
