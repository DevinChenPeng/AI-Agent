import { FC, useEffect, useState } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/build.module.less'
import { BuildingToiletTree } from '../types'
import { Collapse, CollapseProps } from 'antd'
import FloorItem from './FloorItem'
import { CaretRightOutlined } from '@ant-design/icons'

interface BuildFLoorTreeProps {
  toiletTreeData: BuildingToiletTree[]
}

const BuildFLoorTree: FC<BuildFLoorTreeProps> = props => {
  const [buildingToiletTree, setBuildingToiletTree] = useState<CollapseProps['items']>([])
  const [activeKey, setActiveKey] = useState<string[]>([])
  useEffect(() => {
    const items: CollapseProps['items'] = props.toiletTreeData.map(building => ({
      key: building.buildingId,
      label: building.buildingName,
      children: building.floors.map(floor => <FloorItem key={floor.floorId} floor={floor} />)
    }))
    setBuildingToiletTree(items)
    setActiveKey(props.toiletTreeData.map(building => building.buildingId))
  }, [props.toiletTreeData])
  const onChange = (key: string[]): void => {
    setActiveKey(key)
  }
  return (
    <div className={cn(styles.build_floor_tree, 'w-full')}>
      <div className={cn(styles.filter_select)}></div>
      <Collapse
        ghost
        items={buildingToiletTree}
        activeKey={activeKey}
        expandIcon={panelProps => {
          return (
            <div className={cn(styles.expand_icon, panelProps.isActive && styles.isActive)}>
              {<CaretRightOutlined />}
            </div>
          )
        }}
        onChange={onChange}
      />
    </div>
  )
}

export default BuildFLoorTree
