# React TypeScript 代码片段使用指南

本项目配置了丰富的 React + TypeScript 代码片段，帮助你快速生成常用代码模板。

## 📦 组件模板

### `rfc` - React 函数组件（带 Props）
```tsx
import { FC } from 'react'

interface ComponentNameProps {
  
}

const ComponentName: FC<ComponentNameProps> = ({  }) => {
  return (
    <div className="container">
      
    </div>
  )
}

export default ComponentName
```

### `rfcn` - React 函数组件（无 Props）
```tsx
import { FC } from 'react'

const ComponentName: FC = () => {
  return (
    <div className="container">
      
    </div>
  )
}

export default ComponentName
```

### `rfcs` - React 组件 + useState
```tsx
import { FC, useState } from 'react'

interface ComponentNameProps {
  
}

const ComponentName: FC<ComponentNameProps> = ({  }) => {
  const [state, setState] = useState()

  return (
    <div className="container">
      
    </div>
  )
}

export default ComponentName
```

### `rfce` - React 组件 + useEffect
```tsx
import { FC, useEffect } from 'react'

interface ComponentNameProps {
  
}

const ComponentName: FC<ComponentNameProps> = ({  }) => {
  useEffect(() => {
    
  }, [])

  return (
    <div className="container">
      
    </div>
  )
}

export default ComponentName
```

### `rafc` - 导出箭头函数组件
```tsx
import { FC } from 'react'

interface ComponentNameProps {
  
}

export const ComponentName: FC<ComponentNameProps> = ({  }) => {
  return (
    <div className="container">
      
    </div>
  )
}
```

## 🎣 React Hooks

### `ush` - useState
```tsx
const [state, setState] = useState()
```

### `ueh` - useEffect
```tsx
useEffect(() => {
  
}, [])
```

### `ucb` - useCallback
```tsx
const memoizedCallback = useCallback(
  () => {
    
  },
  []
)
```

### `umm` - useMemo
```tsx
const memoizedValue = useMemo(() => {
  return 
}, [])
```

### `urf` - useRef
```tsx
const ref = useRef()
```

## 📝 TypeScript

### `tsi` - TypeScript Interface
```tsx
interface InterfaceName {
  
}
```

### `tst` - TypeScript Type
```tsx
type TypeName = {
  
}
```

## 🎨 样式导入

### `imcss` - 导入 CSS 模块
```tsx
import styles from './ComponentName.css'
```

### `imless` - 导入 Less 模块
```tsx
import styles from './ComponentName.less'
```

## 🛠️ 工具代码

### `clg` - Console Log
```tsx
console.log('label:', )
```

### `tryc` - Try-Catch 块
```tsx
try {
  
} catch (error) {
  console.error('Error:', error)
  
}
```

## 使用方法

1. 在 `.tsx` 或 `.ts` 文件中输入快捷指令（如 `rfc`）
2. 按 `Tab` 键触发代码片段
3. 使用 `Tab` 键在各个占位符之间跳转填写内容
4. 按 `Esc` 退出片段编辑模式

## 提示

- 所有组件模板都包含类型定义，符合 TypeScript 最佳实践
- 组件名称、Props 等占位符支持智能跳转
- 缩进遵循项目规范（2 空格）
- 可根据需要自定义修改 `.vscode/react-typescript.code-snippets` 文件
