import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'

import styles from './index.module.less'
import Left from './left/Left'

const { layout_container, layout_container_main } = styles

interface LayoutProps {
  children?: React.ReactNode
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={cn(layout_container)}>
      <Left />
      <main className={cn(layout_container_main)}>{children}</main>
    </div>
  )
}
export default Layout
