import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'

interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  useBaseHooks()
  console.log(22222)
  return <div className="container">123123</div>
}

export default ComponentName
