import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/valuename.module.less'

interface ValueAndNameProps {}

const ValueAndName: FC<ValueAndNameProps> = props => {
  return (
    <div className={cn(styles.value_and_name)}>
      <div className={cn(styles.value, 'text-16 f-w-700')}>{26.5}°C</div>
      <div className={cn(styles.name)}>温度</div>
    </div>
  )
}

export default ValueAndName
