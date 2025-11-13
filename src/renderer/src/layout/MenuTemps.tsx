import { FC } from 'react'
import routes from '@renderer/routes'
import { useNavigate } from 'react-router-dom'

console.log(routes)

interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const navigate = useNavigate()

  const toNavigate = (path?: string): void => {
    path && navigate(path)
  }

  return (
    <div className="layout-container-menus">
      {routes.map(route => (
        <div
          key={route.path}
          className="layout-container-menus-item"
          onClick={() => toNavigate(route.path)}
        >
          {route.name}
        </div>
      ))}
    </div>
  )
}
export default ComponentName
