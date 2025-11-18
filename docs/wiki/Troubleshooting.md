# 故障排查（Troubleshooting）

## 常见问题

### 1. 启动失败或空白窗口

- 检查依赖是否安装：`pnpm install`
- 关闭占用端口的进程后重试
- 删除 `.pnpm-store` 或 `node_modules` 后重装

### 2. TypeScript 报错

- 运行：`pnpm typecheck` 定位具体文件
- 常见：未使用的导入、类型不匹配；按提示删除或修正

### 3. 图标无法显示

- 路由使用字符串键时，确认该键在 `DynamicIcon` 的 `iconMap` 中存在
- 若使用 `LooseIcon`，请确认传入的名称与 `@ant-design/icons` 导出名一致

### 4. 样式不生效

- 检查是否为 CSS Modules 的样式，类名需要从 `styles` 中解构
- 工具类请确认已在全局样式中引入对应的 `css` 文件

### 5. Windows PowerShell 注意

- 如果出现执行策略限制，使用管理员 PowerShell 执行：
  ```powershell
  Set-ExecutionPolicy RemoteSigned
  ```
- 某些脚本若需串行执行，可用 `;` 连接：`cmd1 ; cmd2`
