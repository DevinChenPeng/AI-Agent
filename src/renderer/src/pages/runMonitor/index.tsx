import ExpansionCollapse from '@renderer/components/ExpansionCollapse'
import styles from './index.module.less'
import { cn } from '@renderer/utils/classNames'
import { useState } from 'react'
function List(): React.JSX.Element {
  const [isFold, setIsFold] = useState(false)
  return (
    <div className={cn(styles.run_monitor, 'wh-full')}>
      <ExpansionCollapse isFold={isFold} setIsFold={setIsFold}></ExpansionCollapse>
    </div>
  )
}

export default List
