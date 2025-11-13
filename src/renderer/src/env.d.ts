/// <reference types="vite/client" />

// 支持 Less 模块导入
declare module '*.less' {
  const content: Record<string, string>
  export default content
}

// 支持 Less CSS Modules
declare module '*.module.less' {
  const classes: Record<string, string>
  export default classes
}

// 支持 CSS 模块导入
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

// 支持 CSS Modules
declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}
