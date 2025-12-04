import { FC, useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { Think as TThink } from '@renderer/types/chat'
interface ThinkProps extends TThink {}

const Think: FC<ThinkProps> = props => {
  const items = [
    {
      key: '1',
      label: props.endName || props.startName,
      children: <p>{props.content}</p>
    }
  ]
  const [active, setActive] = useState('1')
  useEffect(() => {
    if (props.endName) {
      setActive('')
    }
  }, [props.endName])
  return <Collapse items={items} activeKey={active} style={{ marginBottom: 'var(--spacing-3xl' }} />
}

export default Think
