import { FC } from 'react'
import MenuTemps from './MenuTemps'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  console.log(children)

  return (
    <div className="layout-container">
      <nav className="layout-container-nav">
        <MenuTemps />
      </nav>
      <main className="layout-container-main">{children}</main>
    </div>
  )
}

export default Layout
