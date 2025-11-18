# 开发规范与约定（Conventions）

## 代码风格

- 使用 ESLint + Prettier，统一格式与规则
- 推荐提交前执行：`pnpm lint:fix && pnpm format && pnpm typecheck`

## 命名与组织

- 组件文件：`PascalCase`
- 工具与hook：`camelCase`
- 样式模块：`Component.module.less`
- 全局工具类与变量：`styles/css/*.css`

## className 约定

- 优先使用 `cn()` 组合：

```tsx
<div className={cn(styles.wrap, 'fcc', { active: isActive })} />
```

## 单位与尺寸

- 间距/圆角/阴影统一使用 `rem`（1rem=10px）
- 避免硬编码 px，优先使用 CSS 变量与工具类

## 资源与静态文件

- 静态资源放入 `resources` 或渲染端的 `public`（若有）

## 提交信息

- 约定式提交（commitlint），见 `GIT_COMMIT_GUIDE.md`
