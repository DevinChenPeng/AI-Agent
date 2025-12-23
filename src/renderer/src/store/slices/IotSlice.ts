import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InfoCodeDataItem } from '@renderer/types/common'

export type IotObjectInfo = Record<string, Record<string, InfoCodeDataItem>>

export interface IotState {
  objectInfo: IotObjectInfo
}

const initialState: IotState = {
  objectInfo: {}
}

export const iotSlice = createSlice({
  name: 'iotSlice',
  initialState,
  reducers: {
    setIotData: (state, action: PayloadAction<{ id: string; infoCode: string; value: InfoCodeDataItem }>) => {
      const { id, infoCode, value } = action.payload
      if (!state.objectInfo[id]) {
        state.objectInfo[id] = {}
      }
      state.objectInfo[id][infoCode] = value
    }
  }
})

/**
 * 获取IoT数据
 * 根据提供的ID和可选的信息码从IoT状态中获取相应的数据项
 *
 * @param state - IoT状态对象，包含objectInfo等信息
 * @param id - 要查询的对象ID
 * @param infoCode - 可选的信息码，如果提供则返回特定信息码的数据项，否则返回该ID下的所有信息码数据
 * @returns 如果提供了infoCode则返回对应的InfoCodeDataItem，否则返回包含所有信息码的记录对象
 */
export const getIotData = (objectInfo: IotObjectInfo, id: string, infoCode?: string): InfoCodeDataItem | null => {
  if (infoCode) {
    return objectInfo?.[id]?.[infoCode] || {}
  }
  return null
}

export const { setIotData } = iotSlice.actions

export default iotSlice.reducer
