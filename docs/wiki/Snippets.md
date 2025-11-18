# className 与 VSCode 代码片段（Snippets）

## cn() 工具函数

文件：`src/renderer/src/utils/classNames.ts`

- 统一拼接类名，支持字符串/数组/对象（条件类）/嵌套

```ts
import { cn } from '@renderer/utils/classNames'

<div className={cn(styles.box, 'fcc', { active: isActive }, ['extra', cond && 'x'])} />
```

- 会去重并过滤假值（`false | null | undefined | ''`）

## CSS 工具类片段

文件：`.vscode/css-utilities.code-snippets`

- 为常用工具类配置了“缩写前缀”片段，比如：
  - `fr` → `flex-row`
  - `fcc` → `fcc`（Flex 水平垂直居中）
  - `gc3` → `grid-cols-3`
  - `gmd` → `gap-md`
  - `cp` → `cursor-pointer`
  - `z10` → `z-10`
- 如遇冲突，使用数字后缀区分（如 `fc2` → `flex-col`）

## React/TS 片段

文件：`.vscode/react-typescript.code-snippets`

- `rfc`：函数组件（含 Props）
- `rfcn`：函数组件（无 Props）
- `rfcs`/`rfce`：带 useState / useEffect 的模板
- 其他常用 Hooks 与 TS 片段
