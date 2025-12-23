// src/hooks/reduxHooks.ts
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

// 封装类型安全的 useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch
// 封装类型安全的 useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
