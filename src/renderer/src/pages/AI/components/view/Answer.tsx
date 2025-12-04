import { FC } from 'react'
import styles from './answer.module.less'
import { cn } from '@renderer/utils/classNames'
import remarkGfm from 'remark-gfm'
import ReactMarkdown, { type Components } from 'react-markdown'
import hljs from 'highlight.js' // 代码语法高亮

interface ComponentNameProps {
  message: string
}
const renderCodeBlock: Components['code'] = ({ node, className, children, ...props }) => {
  // 匹配代码语言（如 language-javascript）
  const match = /language-(\w+)/.exec(className || '')
  if (match) {
    // 对代码进行语法高亮处理
    const highlightedCode = hljs.highlight(String(children), {
      language: match[1], // 代码语言（js/ts/html 等）
      ignoreIllegals: true // 忽略非法语法，避免报错
    }).value

    // 返回高亮后的代码块（dangerouslySetInnerHTML 渲染 HTML 格式的高亮代码）
    return (
      <pre className={className}>
        <code className={className} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </pre>
    )
  }
  // 默认返回普通代码块
  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
const Think: FC<ComponentNameProps> = props => {
  return (
    <div className={cn(styles.think)}>
      <div className="markdown-body github-markdown-light">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: renderCodeBlock
          }}
        >
          {props.message}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default Think
