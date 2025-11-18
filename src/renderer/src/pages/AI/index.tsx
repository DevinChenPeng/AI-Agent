import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'
import { Button } from 'antd'
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const { fetchEventSourceClient } = useBaseHooks()
  return (
    <div className="container">
      <Button
        type="primary"
        onClick={() => {
          fetchEventSourceClient?.close()
        }}
      >
        关闭链接
      </Button>
    </div>
  )
}

export default ComponentName
