import { configureStore } from '@reduxjs/toolkit'
import IotReducer from './slices/IotSlice'

export const store = configureStore({
  reducer: {
    iot: IotReducer
  }
})

// 2. 定义 RootState：全局状态类型（从 store.getState 推导）
export type RootState = ReturnType<typeof store.getState>
// 3. 定义 AppDispatch：dispatch 类型（从 store.dispatch 推导）
export type AppDispatch = typeof store.dispatch
