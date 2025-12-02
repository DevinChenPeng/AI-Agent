import { FC, useState } from 'react'
import styles from './chat.module.less'
import { cn } from '@renderer/utils/classNames'
import { Input, Button, Tooltip } from 'antd'
import { PaperClipOutlined, AndroidOutlined, SendOutlined } from '@ant-design/icons'
const { TextArea } = Input
const { chat_container } = styles
interface ComponentNameProps {
  onSendMessage?: (message: string) => void
  isThinking?: boolean
}

const ChatContainer: FC<ComponentNameProps> = props => {
  const [message, setMessage] = useState('')
  const sendMessage = (): void => {
    props.onSendMessage?.(message)
    setMessage('')
  }
  const containerInput = (
    <TextArea
      value={message}
      className={cn(styles.editor_wrapper)}
      placeholder="发消息..."
      onChange={e => setMessage(e.target.value)}
    />
  )
  const containerChat = (
    <div className={cn(styles.bottom_wrapper)}>
      <div className={cn(styles.left_tools_wrapper)}>
        <Button type="default" icon={<PaperClipOutlined />} style={{ borderRadius: 'var(--spacing-sm)' }} />
        <Button
          type={props.isThinking ? 'primary' : 'default'}
          icon={<AndroidOutlined />}
          style={{ borderRadius: 'var(--spacing-sm)' }}
        >
          深度思考
        </Button>
      </div>
      <div className={cn(styles.tools_placeholder)}></div>
      <div className={cn(styles.right_tools_wrapper, 'fcc')}>
        <Tooltip placement="top" title="发送">
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined />}
            disabled={!message}
            onClick={sendMessage}
          ></Button>
        </Tooltip>
      </div>
    </div>
  )
  return (
    <div className={cn(chat_container)}>
      {containerInput}
      {containerChat}
    </div>
  )
}

export default ChatContainer
