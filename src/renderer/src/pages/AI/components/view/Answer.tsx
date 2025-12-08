import { FC } from 'react'
import styles from './answer.module.less'
import { cn } from '@renderer/utils/classNames'
import remarkGfm from 'remark-gfm'
import ReactMarkdown, { type Components } from 'react-markdown'
import hljs from 'highlight.js/lib/core' // 只导入核心库

// 按需导入需要的语言支持
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml' // HTML/XML/Vue 模板
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import sql from 'highlight.js/lib/languages/sql'

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('python', python)
hljs.registerLanguage('py', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('css', css)
hljs.registerLanguage('less', css)
hljs.registerLanguage('scss', css)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('vue', xml) // Vue 使用 XML 解析器
hljs.registerLanguage('json', json)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', bash)
hljs.registerLanguage('sql', sql)

interface ComponentNameProps {
  message: string
}
const renderCodeBlock: Components['code'] = ({ node, className, children, ...props }) => {
  // 匹配代码语言（如 language-javascript）
  const match = /language-(\w+)/.exec(className || '')
  if (match) {
    const language = match[1].toLowerCase()
    const codeString = String(children).replace(/\n$/, '') // 移除末尾换行符

    try {
      // 尝试进行语法高亮处理
      const result = hljs.listLanguages().includes(language)
        ? hljs.highlight(codeString, { language, ignoreIllegals: true })
        : hljs.highlightAuto(codeString) // 自动检测语言

      // 返回高亮后的代码块
      return (
        <pre className={className}>
          <code className={className} dangerouslySetInnerHTML={{ __html: result.value }} />
        </pre>
      )
    } catch (error) {
      // 如果高亮失败，返回纯文本代码块
      console.warn(`代码高亮失败 (${language}):`, error)
      return (
        <pre className={className}>
          <code className={className}>{codeString}</code>
        </pre>
      )
    }
  }
  // 默认返回内联代码块
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
