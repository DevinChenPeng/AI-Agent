import { cn } from '@renderer/utils/classNames'
import { FC, useState } from 'react'
import styles from './index.module.less'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
interface ExpansionCollapseProps {
  children?: React.ReactNode
  isFold: boolean
  setIsFold: (isFold: boolean) => void
}

const ExpansionCollapse: FC<ExpansionCollapseProps> = ({ isFold, children, setIsFold }) => {
  const changeFold = (): void => setIsFold(!isFold)
  return (
    <div
      className={cn(
        styles.expansion_collapse,
        'w-full h-full overflow-x-hidden relative flex',
        isFold && styles['is-fold']
      )}
    >
      <div className={cn(styles.expansion_collapse_left)}></div>
      <div className={cn(styles.expansion_collapse_right)}>
        <div className={cn(styles.btn, 'absolute fcc', isFold && styles['is-fold'])} onClick={changeFold}>
          <RightOutlined className={cn(styles.btn_svg)} />
        </div>
      </div>
    </div>
  )
}

export default ExpansionCollapse
