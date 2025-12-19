import { cn } from '@renderer/utils/classNames'
import { FC } from 'react'
import styles from './styles/index.module.less'
import Top from './Top'
import { BuildingToiletTree } from '../types'
import BuildFLoorTree from './BuildFLoorTree'
import SimpleBar from 'simplebar-react'

interface LeftProps {
  toiletTreeData: BuildingToiletTree[]
}

const Left: FC<LeftProps> = props => {
  return (
    <SimpleBar id="left" className={cn(styles.run_monitor_left, 'h-full')} autoHide>
      <Top />
      <BuildFLoorTree toiletTreeData={props.toiletTreeData} />
    </SimpleBar>
  )
}

export default Left
