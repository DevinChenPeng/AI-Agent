import { FC } from 'react'
import styles from './Left.module.less'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import Nav from './Nav'
import { cn } from '@renderer/utils/classNames'
const { layout_container_left, layout_container_avatar, name, subordinate_name, layout_container_footer } = styles
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = () => {
  return (
    <div className={cn(layout_container_left)}>
      <header className={cn(layout_container_avatar)}>
        <Avatar size={64} icon={<UserOutlined />} />
        <div className={cn(name, 'fcc')}>Devin</div>
        <div className={cn(subordinate_name, 'fcc')}>Designer</div>
      </header>
      <Nav />
      <footer className={cn(layout_container_footer, 'fcc', 'cursor-pointer')}>
        <LogoutOutlined style={{ fontSize: '2.4rem', color: 'var(--color-text-primary)' }} />
        <span>Log Out</span>
      </footer>
    </div>
  )
}

export default ComponentName
