import { FC } from 'react'
import { useBaseHooks } from './hooks/useBaseHooks'
import { Button } from 'antd'
import { Input } from 'antd'
import ReactMarkdown from 'react-markdown'
import styles from './index.module.less'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const { AI_list_container } = styles
const { TextArea } = Input
interface ComponentNameProps {}

const ComponentName: FC<ComponentNameProps> = props => {
  const { connect, connect2, close, markdown, text, setText, listRef } = useBaseHooks()
  return (
    <div className={AI_list_container} ref={listRef}>
      <TextArea value={text} onChange={e => setText(e.target.value)} rows={4} />
      <Button onClick={connect}>连接</Button>
      <Button onClick={connect2}>发送</Button>
      <Button onClick={close}>关闭</Button>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}

export default ComponentName
