import { Link } from 'react-router-dom'
import './Home.css'

function Home(): React.JSX.Element {
  return (
    <div className="home-container">
      <h1>欢迎来到首页</h1>
      <p>这是一个使用 Electron + React + TypeScript 构建的应用</p>

      <div className="features">
        <div className="feature-card">
          <h3>⚡ 快速开发</h3>
          <p>使用 Vite 进行快速热更新开发</p>
        </div>
        <div className="feature-card">
          <h3>🎨 现代化</h3>
          <p>React 19 + TypeScript 5</p>
        </div>
        <div className="feature-card">
          <h3>🔧 完善工具链</h3>
          <p>ESLint + Prettier + Husky</p>
        </div>
      </div>

      <Link to="/list" className="nav-button">
        前往列表页 →
      </Link>
    </div>
  )
}

export default Home
