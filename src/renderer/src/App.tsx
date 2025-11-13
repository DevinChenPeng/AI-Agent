import { HashRouter as Router, useRoutes } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import routes from '@renderer/routes'
import Layout from '@renderer/layout'
import theme from '@renderer/untils/MUITheme'
function AppRoutes(): React.JSX.Element | null {
  return useRoutes(routes)
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
