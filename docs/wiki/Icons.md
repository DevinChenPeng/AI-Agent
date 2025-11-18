# 图标系统与动态组件（Icons）

## 白名单动态图标（推荐）

文件：`src/renderer/src/components/DynamicIcon.tsx`

- 使用 `DynamicIcon` 通过字符串键渲染图标，便于配置与 Tree-shaking：

```tsx
import { DynamicIcon } from '@renderer/components/DynamicIcon'

;<DynamicIcon name="openai" size="1.6rem" color="var(--color-text-primary)" />
```

- 可用键（节选）：`openai`, `robot`, `user`, `logout`, `home`, `settings`, `file`, `message`, `search`, `plus`, `minus`, `checkFilled`, `closeFilled`, `info`
- 需要更多图标时，向 `iconMap` 增加映射并导出类型 `IconName`

## 宽松字符串图标（备选）

- `LooseIcon` 支持直接传入 `@ant-design/icons` 的导出名（如 `OpenAIFilled`）
- 缺点：会引入整个图标包，增大体积；仅在必须时使用

## 路由字符串驱动图标

文件：`src/renderer/src/routes/index.tsx`

- `icon` 字段从 React 元素改为字符串：

```ts
{
  path: '/',
  name: '新对话',
  icon: 'openai',
  element: lazyLoad(Home)
}
```

文件：`src/renderer/src/layout/left/MenuTemps.tsx`

- 菜单中统一渲染：

```tsx
{
  route.icon ? <DynamicIcon name={route.icon} size="1.6rem" /> : null
}
{
  route.name
}
```
