import { FC } from 'react'
import routes from '@renderer/routes'
import { useNavigate } from 'react-router-dom'
import { cn } from '@renderer/utils/classNames'

console.log(routes)

interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = () => {
  const navigate = useNavigate()

  const toNavigate = (path?: string): void => {
    path && navigate(path)
  }

  return (
    <div className={cn('layout_container_menus')}>
      {routes.map(route => (
        <div
          key={route.path}
          className={cn('layout_container_menus-item')}
          onClick={() => toNavigate(route.path)}
        >
          {route.name}
        </div>
      ))}
    </div>
  )
}
export default ComponentName
