import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/spacevalues.module.less'
import ValueAndName from '../components/ValueAndName'
import { ToiletSpaceItem } from '../types'

interface SpaceValuesProps {
  space: ToiletSpaceItem
}

const SpaceValues: FC<SpaceValuesProps> = props => {
  const equipments = props.space.equipments || []
  // 卫生间隔间CFIDBP
  const equipmentsByCFIDBP = equipments.filter(equipment => equipment.classCode === 'CFIDBP')

  return (
    <div className={cn(styles.space_values)}>
      <ValueAndName />
      <ValueAndName />
      <ValueAndName />
      <ValueAndName />
    </div>
  )
}

export default SpaceValues
