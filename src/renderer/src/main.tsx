// 导入全局样式
import 'highlight.js/styles/github.css' // highlight.js 的 GitHub 风格高亮样式
import 'github-markdown-css/github-markdown.css' // 引入 github-markdown 双主题样式
import 'simplebar-react/dist/simplebar.min.css'
import './styles/css/index.css'
import './styles/less/index.less'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StrictMode } from 'react'
import store from './store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
