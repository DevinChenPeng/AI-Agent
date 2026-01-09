/**
 * 定义事件监听器的类型，接收一个载荷参数并执行相应操作
 */
export type Listener<Payload> = (payload: Payload) => void

export type StoreConfig = {
  name: string
  keyPath: string
  autoIncrement?: boolean
  indexes?: Array<{
    name: string
    keyPath: string | string[]
    unique?: boolean
  }>
}

export interface IDBOptions {
  dbName?: string
  dbVersion?: number
  storeConfig?: Array<StoreConfig>
}

export enum DBEventKey {
  Success = 'success',
  Error = 'error',
  SaveSuccess = 'saveSuccess',
  SaveError = 'saveError',
  DeleteSuccess = 'deleteSuccess',
  DeleteError = 'deleteError'
}

export interface IDBError {
  storeName: string
  error: string
}

export interface IDBSaveSuccess<T = unknown> {
  storeName: string
  key: IDBValidKey
  value: T
}

export interface IDBDeleteSuccess {
  storeName: string
  key: IDBValidKey
}

export type RejectHandler = (reason?: any) => void

export type DBEvent = {
  [DBEventKey.Success]: IDBDatabase
  [DBEventKey.Error]: string | IDBError
  [DBEventKey.SaveSuccess]: IDBSaveSuccess
  [DBEventKey.SaveError]: IDBError
  [DBEventKey.DeleteSuccess]: IDBDeleteSuccess
  [DBEventKey.DeleteError]: IDBError
}

export type DBEventValue = DBEvent[keyof DBEvent]
