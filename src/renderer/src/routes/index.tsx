import { lazy, Suspense } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

// 懒加载页面组件
const Home = lazy(() => import('../pages/Home'))
const List = lazy(() => import('../pages/List'))

// 路由懒加载包装器
const lazyLoad = (
  Component: React.LazyExoticComponent<() => React.JSX.Element>
): React.JSX.Element => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)
type RouteConfig = RouteObject & {
  name?: string
}
/**
 * 路由配置
 */
const routes: RouteConfig[] = [
  {
    path: '/',
    name: '新对话',
    element: lazyLoad(Home)
  },
  {
    path: '/write',
    name: 'AI 文档',
    element: lazyLoad(List)
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]

export default routes
