import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/abnormal.module.less'

interface AbnormalNumberProps {}

const AbnormalNumber: FC<AbnormalNumberProps> = () => {
  return <div className={cn(styles.abnormalNumber)}>异常事件：{0}</div>
}

export default AbnormalNumber
