import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/floor.module.less'
import { FloorToiletGroup } from '../types'

interface FloorItemProps {
  floor: FloorToiletGroup
}

const FloorItem: FC<FloorItemProps> = props => {
  return (
    <div className={cn(styles.floor)}>
      <div className={cn(styles.floor_name, 'fc')}>{props.floor.floorName}</div>
    </div>
  )
}

export default FloorItem
