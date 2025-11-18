# 路由与懒加载（Routing）

文件：`src/renderer/src/routes/index.tsx`

## 懒加载包装

```tsx
const lazyLoad = (Component: React.LazyExoticComponent<() => React.JSX.Element>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
)
```

## 配置示例（字符串图标）

```ts
{
  path: '/',
  name: '新对话',
  icon: 'openai', // 字符串，菜单中通过 DynamicIcon 渲染
  element: lazyLoad(Home)
}
```

## 菜单渲染（读取 routes）

文件：`src/renderer/src/layout/left/MenuTemps.tsx`

```tsx
{
  route.icon ? <DynamicIcon name={route.icon} size="1.6rem" /> : null
}
{
  route.name
}
```
