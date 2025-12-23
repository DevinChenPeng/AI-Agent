import { FC, useContext, useEffect, useState } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/spacevalues.module.less'
import ValueAndName, { ValueAndNameProps } from '../components/ValueAndName'
import { ToiletSpaceItem } from '../types'
import { AppContext } from '../contexts'
import { EquipmentDetail } from '@renderer/types/common'
import { orderBy } from 'lodash'

interface SpaceValuesProps {
  space: ToiletSpaceItem
}
const IF_OCCUPIED = {
  infoCode: 'ifOccupied',
  occupied: { code: 'OCCUPIED', name: '占用', values: ['1', 1] },
  unoccupied: { code: 'UNOCCUPIED', name: '无人', values: ['0', 0] },
  noData: { code: '--', name: '--', values: ['', null, undefined] }
}
const SpaceValues: FC<SpaceValuesProps> = props => {
  const { getObjectDataByInfoCode = () => {}, objectInfo = {}, objectDataMap = new Map() } = useContext(AppContext)
  const { equipments = [], id } = props.space
  // 空闲/总坑位 >温度 >NH3 >H2S >送风状态 >排风状态>末端开启/总数 >照明开启/总数 >湿度 >PM2.5

  const [infoCodes, setInfoCodes] = useState<ValueAndNameProps[]>([])
  useEffect(() => {
    console.log(props.space)

    const arr: ValueAndNameProps[] = []
    const spaceData: EquipmentDetail = objectDataMap.get(props.space.id)
    // 空闲卫生间隔间数 卫生间隔间的信息点【厕位占用状态】ifOccupied=0“无人”的数量
    const freeCount = equipments.filter(equipment =>
      IF_OCCUPIED.unoccupied.values.includes(getObjectDataByInfoCode(equipment.id, 'ifOccupied')?.dataValue as string)
    ).length
    if (equipments.length) {
      arr.unshift({
        name: '空闲/总坑位',
        value: `${freeCount}/${equipments.length}`,
        infoCode: 'freeCount',
        sequence: 1
      })
    }

    if (spaceData?.relInfoCodeGroupConfigs?.length) {
      const infoCodesConfig = spaceData?.relInfoCodeGroupConfigs[0]?.relInfoCodeConfigs || []
      infoCodesConfig.forEach(infoCodeItem => {
        const dataItem = getObjectDataByInfoCode(props.space.id, infoCodeItem.infoCode)
        if (dataItem?.infoCode) {
          arr.push({
            name: infoCodeItem.infoCodeName,
            value: dataItem.dataValue || '--' + dataItem.unit || '',
            infoCode: infoCodeItem.infoCode,
            sequence: infoCodeItem.sequence
          })
        }
      })
    }

    setInfoCodes(orderBy(arr, ['sequence'], ['asc']).slice(0, 4))
  }, [equipments, objectInfo[id], ...equipments.map(item => objectInfo[item.id])])
  return (
    <div className={cn(styles.space_values)}>
      {infoCodes.map(infoCode => (
        <ValueAndName key={infoCode.infoCode} {...infoCode} />
      ))}
    </div>
  )
}

export default SpaceValues
