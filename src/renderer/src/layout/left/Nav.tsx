import { FC } from 'react'
import MenuTemps from './MenuTemps'
import styles from './Nav.module.less'
import { cn } from '@renderer/utils/classNames'
interface ComponentNameProps {}
const { layout_container_nav } = styles
const ComponentName: FC<ComponentNameProps> = () => {
  return (
    <nav className={cn(layout_container_nav, 'gap-2xl')}>
      <MenuTemps />
    </nav>
  )
}

export default ComponentName
