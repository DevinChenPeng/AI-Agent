# 快速上手（Getting Started）

## 环境要求

- Node.js 18+（建议 LTS）
- pnpm 8+
- Windows、macOS 或 Linux（本仓库开发在 Windows 上验证）

## 安装依赖

```powershell
pnpm install
```

## 启动开发

```powershell
pnpm dev
```

- 自动启动 Electron 渲染与主进程，支持热更新。

## 生产构建

```powershell
# 先做类型检查再构建
pnpm build

# 仅打包为可分发目录（不生成安装包）
pnpm build:unpack

# 生成平台安装包（示例：Windows）
pnpm build:win
```

## 常见目录

- `src/main` 主进程
- `src/preload` 预加载脚本
- `src/renderer` 渲染进程（React 应用）
- `resources` 资源目录
- `build` 打包配置
