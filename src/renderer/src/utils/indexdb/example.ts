import { IndexDB } from './index'

const indexDB = new IndexDB({
  dbName: 'exampleDB',
  dbVersion: 1,
  storeConfig: [
    {
      name: 'users',
      keyPath: 'userId',
      autoIncrement: true,
      indexes: [
        {
          name: 'name',
          keyPath: 'name',
          unique: false
        }
      ]
    }
  ]
})
const main = async () => {
  await indexDB.init()
  await indexDB.add('users', { userId: IndexDB.nextIndex(), age: 18, name: 'test' })
  await indexDB.add('users', { userId: IndexDB.nextIndex(), age: 18, name: 'test' })
}
main()
