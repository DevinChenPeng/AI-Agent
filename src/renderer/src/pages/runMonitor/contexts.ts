import { createContext } from 'react'
import { BaseData } from './hooks/useBaseData'

export const AppContext = createContext<Partial<BaseData>>({})
