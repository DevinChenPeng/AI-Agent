import { lazy, Suspense } from 'react'
import { RouteObject, Navigate } from 'react-router-dom'
import Loading from '../components/Loading'
import type { IconName } from '@renderer/components/DynamicIcon'

// 懒加载页面组件
const AI = lazy(() => import('../pages/AI/index'))
const RunMonitor = lazy(() => import('../pages/runMonitor/index'))
const Ipc = lazy(() => import('../pages/IPC/index'))

// 路由懒加载包装器
const lazyLoad = (
  Component: React.LazyExoticComponent<React.ComponentType<Record<string, never>>>
): React.JSX.Element => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)
type RouteConfig = RouteObject & {
  name?: string
  icon?: IconName
}
/**
 * 路由配置
 */
const routes: RouteConfig[] = [
  {
    path: '/',
    name: '新对话',
    icon: 'openai',
    element: lazyLoad(AI)
  },
  {
    path: '/run-monitor',
    name: '运行监控',
    icon: 'DashboardOutlined',
    element: lazyLoad(RunMonitor)
  },
  {
    path: '/ipc',
    name: '通信监控',
    icon: 'message',
    element: lazyLoad(Ipc)
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]

export default routes
