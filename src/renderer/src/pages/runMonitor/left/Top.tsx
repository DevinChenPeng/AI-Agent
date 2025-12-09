import { cn } from '@renderer/utils/classNames'
import { FC, useContext, useEffect, useState } from 'react'
import styles from './styles/top.module.less'
import { AppContext } from '../contexts'
import { ToiletSpaceItem } from '../types'

interface TopProps {}
interface ToiletRoomFuncTypes extends Partial<ToiletSpaceItem> {
  total: number
}
const Top: FC<TopProps> = () => {
  const { toiletSpaceMap } = useContext(AppContext)
  const [toiletRoomFuncTypes, setToiletRoomFuncTypes] = useState<ToiletRoomFuncTypes[]>([])
  useEffect(() => {
    if (toiletSpaceMap) {
      const map = new Map()
      map.set('all', {
        roomFuncType: 'all',
        roomFuncTypeName: '卫生间总数',
        total: toiletSpaceMap.size
      })
      Array.from(toiletSpaceMap.values()).forEach(item => {
        if (map.has(item.roomFuncType)) {
          map.get(item.roomFuncType).total += 1
        } else {
          map.set(item.roomFuncType, {
            roomFuncType: item.roomFuncType,
            roomFuncTypeName: item.roomFuncTypeName,
            total: 1
          })
        }
      })
      setToiletRoomFuncTypes(Array.from(map.values()))
    }
  }, [toiletSpaceMap])
  return (
    <div className={cn(styles.left_top)}>
      <h2 className={cn('f-w-700')}>智慧卫生间</h2>
      <div className={cn(styles.top_content)}>
        {toiletRoomFuncTypes.map(item => (
          <div className={cn(styles.top_content_item, 'fc')} key={item.roomFuncType}>
            <div className={cn(styles.item_chart)}></div>
            <div className={cn(styles.item_name)}>
              <div className={cn('text-24', 'f-w-700')}>{item.total}</div>
              <div style={{ color: 'var(--color-text-tertiary)' }}>{item.roomFuncTypeName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Top
