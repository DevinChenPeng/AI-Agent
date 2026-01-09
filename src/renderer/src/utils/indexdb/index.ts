import { PubSub } from './pubSub'
import { DBEvent, DBEventKey, DBEventValue, IDBOptions, RejectHandler, StoreConfig } from './types'

class IndexDB extends PubSub<DBEvent> {
  private db: IDBDatabase | undefined
  private dbName: string = 'myDatabase'
  private dbVersion: number = 1
  public storeConfig: Array<StoreConfig> = []
  // 静态自增index，用于生成唯一标识
  public static index: number = 1000
  constructor(options?: IDBOptions) {
    super()
    options?.dbName && (this.dbName = options.dbName)
    options?.dbVersion && (this.dbVersion = options.dbVersion)
    options?.storeConfig && (this.storeConfig = options.storeConfig)
  }
  public static nextIndex(): number {
    return IndexDB.index++
  }

  /**
   * 初始化IndexedDB数据库实例。
   * 如果数据库不存在，则创建新数据库；如果版本号变更，则执行升级操作。
   * 成功时返回数据库实例并触发成功事件；失败时拒绝Promise并触发错误事件。
   *
   * @returns {Promise<IDBDatabase>} 返回初始化完成的IDBDatabase实例
   */
  public async init(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(this.dbName, this.dbVersion)
      request.onerror = () => {
        reject(`初始化失败：${request.error}`)
        this.publish(DBEventKey.Error, `初始化失败：${request.error}`)
      }
      request.onsuccess = () => {
        this.db = request.result
        resolve(this.db)
        this.publish(DBEventKey.Success, this.db)
      }
      // 数据库升级时创建对象仓库及索引结构
      request.onupgradeneeded = () => {
        this.db = request.result
        // 遍历存储配置创建对象仓库（若不存在）并建立索引
        this.storeConfig.forEach((config: StoreConfig) => {
          if (this.db) {
            if (!this.db.objectStoreNames.contains(config.name)) {
              const store: IDBObjectStore = this.db.createObjectStore(config.name, { keyPath: config.keyPath })
              config.indexes?.forEach(idx => {
                store.createIndex(idx.name, idx.keyPath, { unique: idx.unique || false })
              })
            }
          }
        })
      }
    })
  }
  /**
   * 错误处理函数，检查数据库是否已初始化以及指定的数据仓库是否存在
   * 如果数据库未初始化或数据仓库不存在，则触发错误事件并拒绝Promise
   *
   * @param storeName - 要操作的数据仓库名称
   * @param reject - Promise的拒绝函数，用于传递错误信息
   * @returns 如果发生错误则返回true，否则返回false
   */
  private errorHandler(storeName: string, reject?: RejectHandler): boolean {
    if (!this.db) {
      const message: string = '数据库未初始化'
      this.publish(DBEventKey.Error, { storeName, error: message })
      reject?.(new Error(message))
      return true
    }

    if (!this.db.objectStoreNames.contains(storeName)) {
      const message: string = `数据仓库 ${storeName} 不存在`
      this.publish(DBEventKey.Error, { storeName, error: message })
      reject?.(new Error(message))
      return true
    }
    return false
  }
  /**
   * 创建一个IndexedDB事务并返回指定的对象存储库
   * @param storeName - 要操作的对象存储库名称
   * @param mode - 事务模式，默认为'readonly'（只读模式）
   * @returns 返回指定存储库的对象存储库实例，如果数据库未初始化则返回null
   */
  createTransaction(storeName: string, mode: IDBTransactionMode = 'readonly') {
    return this.db?.transaction([storeName], mode)
  }
  /**
   * 从IDB事务中获取对象存储
   * @param transaction - IDB事务对象，用于访问数据库中的对象存储
   * @param storeName - 要获取的对象存储的名称
   * @returns 返回指定名称的对象存储实例
   */
  createObjectStore(transaction: IDBTransaction, storeName: string) {
    return transaction.objectStore(storeName)
  }
  /**
   * 执行IndexedDB操作的通用方法
   * 封装了事务处理、错误处理和事件发布逻辑
   */
  private async operate<TResult>(
    storeName: string,
    operation: (store: IDBObjectStore) => IDBRequest<TResult>,
    eventTypes: { success: DBEventKey; error: DBEventKey },
    payloadBuilder: (result: TResult) => DBEventValue,
    errorPrefix: string
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      if (this.errorHandler(storeName, reject)) return
      if (this.db) {
        const transaction = this.createTransaction(storeName, 'readwrite')!
        const store = this.createObjectStore(transaction, storeName)
        const request = operation(store)

        transaction.onabort = () => {
          const message: string = `事务终止：${transaction.error ?? '未知错误'}`
          this.publish(eventTypes.error, { storeName, error: message })
          reject(new Error(message))
        }

        request.onsuccess = () => {
          this.publish(eventTypes.success, payloadBuilder(request.result))
          resolve(request.result)
        }

        request.onerror = () => {
          const message: string = `${errorPrefix}：${request.error}`
          this.publish(eventTypes.error, { storeName, error: message })
          reject(new Error(message))
        }
      }
    })
  }

  /**
   * 向指定对象存储库添加新记录
   *
   * @template TValue - 要添加的值的类型
   * @param {string} storeName - 目标对象存储库名称
   * @param {TValue} value - 要添加到存储库的值
   * @returns {Promise<IDBValidKey>} 返回新记录的主键值
   * @throws {Error} 当数据库操作失败时抛出错误
   */
  public async add<TValue>(storeName: string, value: TValue): Promise<IDBValidKey> {
    return this.operate<IDBValidKey>(
      storeName,
      store => store.add(value),
      { success: DBEventKey.SaveSuccess, error: DBEventKey.SaveError },
      key => ({ storeName, key, value }),
      '写入失败'
    )
  }
  /**
   * 从指定对象存储库中删除记录
   *
   * @param {string} storeName - 目标对象存储库名称
   * @param {IDBValidKey} key - 要删除的记录的主键
   * @returns {Promise<void>} 返回一个在删除成功时解析的Promise
   */
  public async delete(storeName: string, key: IDBValidKey): Promise<void> {
    return this.operate<undefined>(
      storeName,
      store => store.delete(key),
      { success: DBEventKey.DeleteSuccess, error: DBEventKey.DeleteError },
      () => ({ storeName, key }),
      '删除失败'
    )
  }
  /**
   * 从指定的数据库对象仓库中获取指定键对应的值
   * @template TValue - 要获取的值的类型
   * @param storeName - 对象仓库名称
   * @param key - 要获取的记录的键值，必须是有效的IDB键类型
   * @returns 返回一个Promise，解析为指定键对应的值，如果键不存在则返回undefined
   */
  public async get<TValue>(storeName: string, key: IDBValidKey): Promise<TValue | undefined> {
    return this.operate<TValue | undefined>(
      storeName,
      store => store.get(key),
      { success: DBEventKey.SaveSuccess, error: DBEventKey.SaveError },
      result => ({ storeName, key, value: result }),
      '获取失败'
    )
  }
  /**
   * 根据索引获取数据库中指定存储对象的值
   * @param storeName 存储对象名称
   * @param indexName 索引名称
   * @param key 要查询的键值
   * @returns 返回查询到的值，如果未找到则返回undefined
   */
  public async getByIndex<TValue>(storeName: string, indexName: string, key: IDBValidKey): Promise<TValue | undefined> {
    return this.operate<TValue | undefined>(
      storeName,
      store => store.index(indexName).get(key),
      { success: DBEventKey.SaveSuccess, error: DBEventKey.SaveError },
      result => ({ storeName, key, value: result }),
      '获取失败'
    )
  }
}

export default new IndexDB()
export { IndexDB }
