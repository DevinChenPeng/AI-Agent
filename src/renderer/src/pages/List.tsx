import { useState } from 'react'
import { Link } from 'react-router-dom'
import './List.css'

interface ListItem {
  id: number
  title: string
  description: string
  status: 'pending' | 'completed' | 'in-progress'
}

function List(): React.JSX.Element {
  const [items] = useState<ListItem[]>([
    {
      id: 1,
      title: '配置开发环境',
      description: '安装 Node.js、pnpm 和相关开发工具',
      status: 'completed'
    },
    {
      id: 2,
      title: '搭建项目结构',
      description: '创建 Electron + React + TypeScript 项目',
      status: 'completed'
    },
    {
      id: 3,
      title: '配置代码规范',
      description: 'ESLint + Prettier + Husky + Commitlint',
      status: 'completed'
    },
    {
      id: 4,
      title: '添加路由功能',
      description: '使用 React Router 实现页面导航',
      status: 'in-progress'
    },
    {
      id: 5,
      title: '开发业务功能',
      description: '实现具体的业务逻辑和功能',
      status: 'pending'
    }
  ])

  const getStatusBadge = (status: string): React.JSX.Element => {
    const statusMap = {
      completed: { text: '已完成', class: 'status-completed' },
      'in-progress': { text: '进行中', class: 'status-progress' },
      pending: { text: '待处理', class: 'status-pending' }
    }
    const config = statusMap[status] || statusMap.pending
    return <span className={`status-badge ${config.class}`}>{config.text}</span>
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>任务列表</h1>
        <p>项目开发进度跟踪</p>
      </div>

      <div className="list-content">
        {items.map(item => (
          <div key={item.id} className="list-item">
            <div className="list-item-header">
              <h3>{item.title}</h3>
              {getStatusBadge(item.status)}
            </div>
            <p className="list-item-description">{item.description}</p>
          </div>
        ))}
      </div>

      <Link to="/" className="nav-button">
        ← 返回首页
      </Link>
    </div>
  )
}

export default List
