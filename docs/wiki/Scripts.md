# 常用脚本（Scripts）

所有脚本见 `package.json` → `scripts`：

- `pnpm dev`：开发模式，启动 Electron + Vite
- `pnpm build`：类型检查后进行生产构建
- `pnpm start`：启动预览（构建产物）
- `pnpm typecheck`：同时对 node/web 两端进行 TypeScript 检查
- `pnpm lint` / `pnpm lint:fix`：ESLint 检查 / 自动修复
- `pnpm format`：Prettier 统一格式化
- `pnpm build:unpack`：构建并输出未打包的应用目录
- `pnpm build:win|mac|linux`：构建平台安装包
