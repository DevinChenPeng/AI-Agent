import { cn } from '@renderer/utils/classNames'
import { FC } from 'react'
import styles from './styles/index.module.less'
import Top from './Top'
import { BuildingToiletTree } from '../types'
import BuildFLoorTree from './BuildFLoorTree'

interface LeftProps {
  toiletTreeData: BuildingToiletTree[]
}

const Left: FC<LeftProps> = props => {
  return (
    <div className={cn(styles.run_monitor_left, 'h-full')}>
      <Top />
      <BuildFLoorTree toiletTreeData={props.toiletTreeData} />
    </div>
  )
}

export default Left
