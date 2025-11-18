# 项目结构与架构（Architecture）

主要目录（节选）：

```
src/
  main/           # Electron 主进程入口（TS）
  preload/        # 预加载脚本，桥接主/渲染进程
  renderer/       # React 渲染进程应用
    src/
      pages/      # 页面
      components/ # 组件（包含 Loading、DynamicIcon 等）
      layout/     # 布局（Left、Nav、MenuTemps 等）
      routes/     # 路由定义与懒加载
      styles/     # 样式体系（css 变量/工具类）
      utils/      # 工具方法（classNames、http 等）
```

渲染端使用 React 路由与懒加载。菜单（`layout/left/MenuTemps.tsx`）从 `routes` 读取配置，统一渲染名称和图标。
