import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'
import { Button } from 'antd'
import { Input } from 'antd'
import ReactMarkdown, { Components } from 'react-markdown'
import styles from './index.module.less'
import remarkGfm from 'remark-gfm'
import hljs from 'highlight.js' // 代码语法高亮
import 'highlight.js/styles/github.css' // highlight.js 的 GitHub 风格高亮样式
import 'github-markdown-css/github-markdown.css' // 引入 github-markdown 双主题样式

const { AI_list_container } = styles
const { TextArea } = Input
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const { connect, connect2, close, markdown, text, setText, listRef } = useBaseHooks()

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
  return (
    <div className={AI_list_container} ref={listRef}>
      <TextArea value={text} onChange={e => setText(e.target.value)} rows={4} />
      <Button onClick={connect}>连接</Button>
      <Button onClick={connect2}>发送</Button>
      <Button onClick={close}>关闭</Button>
      <div className="markdown-body github-markdown-light">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: renderCodeBlock
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default ComponentName
