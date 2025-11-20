import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'
import { Button } from 'antd'
import { Input } from 'antd'
const { TextArea } = Input
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const { sseClient } = useBaseHooks()
  return (
    <div className="container">
      <TextArea rows={4} />
    </div>
  )
}

export default ComponentName
