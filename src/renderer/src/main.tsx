// 导入全局样式
import './styles/css/index.css'
// 导入 Less 示例样式
import './styles/less/example.less'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
