import { cn } from '@renderer/utils/classNames'
import { FC } from 'react'
import styles from './index.module.less'
import { RightOutlined } from '@ant-design/icons'
interface ExpansionCollapseProps {
  left?: React.ReactNode
  right?: React.ReactNode
  isFold: boolean
  setIsFold: (isFold: boolean) => void
}

const ExpansionCollapse: FC<ExpansionCollapseProps> = ({ isFold, left, right, setIsFold }) => {
  const changeFold = (): void => setIsFold(!isFold)
  return (
    <div
      className={cn(
        styles.expansion_collapse,
        'w-full h-full overflow-x-hidden relative flex',
        isFold && styles['is-fold']
      )}
    >
      <div className={cn(styles.expansion_collapse_left)}>{left}</div>
      <div className={cn(styles.expansion_collapse_right)}>
        <div className={cn(styles.btn, 'absolute fcc', isFold && styles['is-fold'])} onClick={changeFold}>
          <RightOutlined className={cn(styles.btn_svg)} />
        </div>
        {right}
      </div>
    </div>
  )
}

export default ExpansionCollapse
