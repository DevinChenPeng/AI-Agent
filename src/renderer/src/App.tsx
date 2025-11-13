import { HashRouter as Router, useRoutes } from 'react-router-dom'
import routes from './routes'

function AppRoutes(): React.JSX.Element | null {
  return useRoutes(routes)
}

function App(): React.JSX.Element {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
