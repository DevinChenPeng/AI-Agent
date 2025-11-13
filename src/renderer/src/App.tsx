import { HashRouter as Router, useRoutes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import routes from '@renderer/routes'
import Layout from '@renderer/layout'
import antdTheme from '@renderer/utils/antdTheme'
import 'antd/dist/reset.css'
function AppRoutes(): React.JSX.Element | null {
  return useRoutes(routes)
}

function App(): React.JSX.Element {
  return (
    <ConfigProvider locale={zhCN} theme={antdTheme}>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ConfigProvider>
  )
}

export default App
