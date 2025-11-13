import { FC } from 'react'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = () => {
  return <div className="layout-container"></div>
}

export default Layout
