import { FC } from 'react'
import MenuTemps from './MenuTemps'
import styles from './index.module.less'
interface LayoutProps {
  children?: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  console.log(children)

  return (
    <div className={styles['layout-container']}>
      <nav className={styles['layout-container-nav']}>
        <MenuTemps />
      </nav>
      <main className={styles['layout-container-main']}>{children}</main>
    </div>
  )
}
export default Layout
