import { cn } from '@renderer/utils/classNames'
import { FC, JSX } from 'react'
import styles from './styles/index.module.less'
import Top from './Top'
import { BuildingToiletTree } from '../types'
import BuildFLoorTree from './BuildFLoorTree'
import SimpleBar from 'simplebar-react'

interface LeftProps {
  toiletTreeData: BuildingToiletTree[]
  loading: boolean
}

const Left: FC<LeftProps> = props => {
  const content = (): JSX.Element | null => {
    if (props.loading) {
      return null
    }
    return (
      <>
        <Top />
        <BuildFLoorTree toiletTreeData={props.toiletTreeData} />
      </>
    )
  }
  return (
    <SimpleBar id="left" className={cn(styles.run_monitor_left, 'h-full')} autoHide>
      {content()}
    </SimpleBar>
  )
}

export default Left
