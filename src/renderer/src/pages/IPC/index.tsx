import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './index.module.less'
import { Button, Flex } from 'antd'

interface IpcProps {}

const Ipc: FC<IpcProps> = () => {
  const ping = () => {
    console.log('ping')
    window.electron.ipcRenderer.send('ping', 'ping from renderer')
  }
  const notification = () => {
    window.electron.ipcRenderer.send('notification', 'notification from renderer')
  }
  return (
    <div className={cn(styles.ipc)}>
      <Flex gap="small" wrap>
        <Button type="primary" onClick={ping}>
          Ping
        </Button>
        <Button onClick={notification}>notification</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Flex>
    </div>
  )
}

export default Ipc
