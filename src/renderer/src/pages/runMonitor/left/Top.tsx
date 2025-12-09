import { cn } from '@renderer/utils/classNames'
import { FC, useContext, useEffect, useState } from 'react'
import styles from './styles/top.module.less'
import { AppContext } from '../contexts'
import { ToiletSpaceItem } from '../types'
import { uniqBy } from 'lodash'

interface TopProps {}
interface ToiletRoomFuncTypes extends Partial<ToiletSpaceItem> {
  total: number
}
const Top: FC<TopProps> = props => {
  const { toiletSpaceMap } = useContext(AppContext)
  const [toiletRoomFuncTypes, setToiletRoomFuncTypes] = useState<ToiletRoomFuncTypes[]>([])
  useEffect(() => {
    if (toiletSpaceMap) {
      const arr = [
        {
          roomFuncType: 'all',
          roomFuncTypeName: '卫生间总数',
          total: toiletSpaceMap.size
        }
      ]
      Array.from(toiletSpaceMap.values()).forEach(item => {
        arr.push({
          roomFuncType: item.roomFuncType,
          roomFuncTypeName: item.roomFuncTypeName,
          total: arr.filter(i => i.roomFuncType === item.roomFuncType).length
        })
      })
      setToiletRoomFuncTypes(uniqBy(arr, 'roomFuncType'))
    }
  }, [toiletSpaceMap])
  return (
    <div className={cn(styles.left_top)}>
      <h2 className={cn('f-w-700')}>智慧卫生间</h2>
      <div className={cn(styles.top_content)}>
        {toiletRoomFuncTypes.map(item => (
          <div className={cn(styles.top_content_item)} key={item.roomFuncType}>
            {item.roomFuncTypeName}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Top
