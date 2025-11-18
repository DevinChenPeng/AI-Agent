import { FC } from 'react'
import routes from '@renderer/routes'
import { NavLink } from 'react-router-dom'
import { cn } from '@renderer/utils/classNames'
import { DynamicIcon, type IconName } from '@renderer/components/DynamicIcon'
import styles from './MenuTemps.module.less'
const { layout_container_nav_item, layout_container_nav_icon, active } = styles
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = () => {
  const arr = routes.filter(route => route.name)
  return arr.map(route => {
    const to = String(route.path || '/')
    const end = to === '/'
    return (
      <NavLink key={route.path} to={to} end={end} className={({ isActive }) => cn(layout_container_nav_item, 'fc', 'gap-sm', isActive && active)}>
        {({ isActive }) => (
          <>
            {route.icon ? (
              <div className={cn(layout_container_nav_icon, isActive && active)}>
                <DynamicIcon
                  name={route.icon as IconName}
                  size="var(--font-size-4xl)"
                  color={isActive ? 'var(--color-text-inverse)' : 'var(--color-text-primary)'}
                />
              </div>
            ) : null}
            <span>{route.name}</span>
          </>
        )}
      </NavLink>
    )
  })
}
export default ComponentName
