import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'
import { Button } from 'antd'
import { Input } from 'antd'
import ReactMarkdown from 'react-markdown'
const { TextArea } = Input
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const { connect, connect2, close, markdown } = useBaseHooks()
  return (
    <div className="container">
      <TextArea rows={4} />
      <Button onClick={connect}>连接</Button>
      <Button onClick={connect2}>连接</Button>
      <Button onClick={close}>关闭</Button>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}

export default ComponentName
