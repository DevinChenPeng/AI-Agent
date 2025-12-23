import { listInfoCodeConfigsByObjectId } from '@renderer/api/runMonitor'
import { HTTP_STATUS } from '@renderer/constants/http'
import { RootState } from '@renderer/store'
import getCancelToken from '@renderer/utils/http/getCancelToken'
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './reduxHooks'
import { setIotData, getIotData } from '@renderer/store/slices/IotSlice'
import { EquipmentDetail, RelInfoCodeGroupConfig } from '@renderer/types/common'
const { cancelToken, cancelQuest } = getCancelToken()

export const useIotData = () => {
  // 获取信息代码配置
  const objectInfo = useAppSelector((state: RootState) => state.iot.objectInfo)
  // 类型安全：dispatch 能识别所有 Action 类型
  const dispatch = useAppDispatch()
  ;(window as any).setIotDataFn = (id, infoCode, value) => {
    dispatch(
      setIotData({
        id,
        infoCode,
        value
      })
    )
  }
  const getEquipmentInfoCodes = async (objectIds: string[]): Promise<EquipmentDetail[]> => {
    cancelQuest()
    try {
      const res = await listInfoCodeConfigsByObjectId(
        {
          runningMonitorType: 'TOILET',
          objectIds,
          templateType: 'GRID'
        },
        { cancelToken: cancelToken() }
      )
      if (res.code === HTTP_STATUS.SUCCESS_CODE) {
        const traverseGroup = (groupItem: RelInfoCodeGroupConfig, id: string) => {
          groupItem.relInfoCodeConfigs?.forEach(codeItem => {
            dispatch(
              setIotData({
                id,
                infoCode: codeItem.infoCode,
                value: codeItem
              })
            )
          })
          groupItem.groupChildren?.forEach(child => traverseGroup(child, id))
        }
        res.data?.forEach(item => {
          item.relInfoCodeGroupConfigs?.forEach(groupItem => traverseGroup(groupItem, item.id))
        })
      }
      return res.data || []
    } catch (error) {
      console.log(error)
      return []
    }
  }
  const getObjectDataByInfoCode = (id: string, infoCode?: string) => {
    return getIotData(objectInfo, id, infoCode)
  }
  useEffect(() => {
    return () => {
      cancelQuest()
    }
  }, [])
  return {
    objectInfo,
    getEquipmentInfoCodes,
    getObjectDataByInfoCode
  }
}
