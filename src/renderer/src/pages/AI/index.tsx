import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'

interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  useBaseHooks()
  return <div className="container">123123</div>
}

export default ComponentName
