/**
 * Less 使用示例组件
 * 演示如何在 React 组件中使用 Less 样式
 */

import React, { useState } from 'react'
import './LessExample.less'

const LessExample: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="less-demo-container">
      <div className="less-demo-header">
        <h1>Less 样式示例</h1>
      </div>

      <div className="less-demo-content">
        {/* 卡片示例 */}
        <div className="demo-card">
          <div className="demo-card-header">
            <h2>功能卡片</h2>
          </div>
          <div className="demo-card-body">
            <p>这是一个使用 Less 样式的卡片组件示例</p>
            <p>支持变量、嵌套、混合等 Less 特性</p>
          </div>
          <div className="demo-card-footer">
            <button className="demo-button">了解更多</button>
          </div>
        </div>

        {/* 按钮组示例 */}
        <div className="demo-button-group">
          <h3>按钮样式示例</h3>
          <div className="button-row">
            <button className="demo-button primary">Primary</button>
            <button className="demo-button success">Success</button>
            <button className="demo-button warning">Warning</button>
            <button className="demo-button error">Error</button>
            <button className="demo-button" disabled>
              Disabled
            </button>
          </div>
        </div>

        {/* 计数器示例 */}
        <div className="demo-counter">
          <h3>交互示例</h3>
          <div className="counter-display">
            <span className="counter-label">当前计数:</span>
            <span className="counter-value">{count}</span>
          </div>
          <div className="counter-buttons">
            <button className="demo-button primary" onClick={() => setCount(count - 1)}>
              -1
            </button>
            <button className="demo-button success" onClick={() => setCount(0)}>
              重置
            </button>
            <button className="demo-button primary" onClick={() => setCount(count + 1)}>
              +1
            </button>
          </div>
        </div>

        {/* 栅格系统示例 */}
        <div className="demo-grid">
          <h3>栅格系统示例</h3>
          <div className="demo-row">
            <div className="demo-col demo-col-4">
              <div className="grid-item">Col-4</div>
            </div>
            <div className="demo-col demo-col-4">
              <div className="grid-item">Col-4</div>
            </div>
            <div className="demo-col demo-col-4">
              <div className="grid-item">Col-4</div>
            </div>
          </div>
          <div className="demo-row">
            <div className="demo-col demo-col-6">
              <div className="grid-item">Col-6</div>
            </div>
            <div className="demo-col demo-col-6">
              <div className="grid-item">Col-6</div>
            </div>
          </div>
          <div className="demo-row">
            <div className="demo-col demo-col-12">
              <div className="grid-item">Col-12</div>
            </div>
          </div>
        </div>

        {/* 颜色主题示例 */}
        <div className="demo-colors">
          <h3>主题颜色示例</h3>
          <div className="color-row">
            <div className="color-box primary-bg">Primary</div>
            <div className="color-box success-bg">Success</div>
            <div className="color-box warning-bg">Warning</div>
            <div className="color-box error-bg">Error</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessExample
