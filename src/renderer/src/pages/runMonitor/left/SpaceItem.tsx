import { FC } from 'react'
import { cn } from '@renderer/utils/classNames'
import styles from './styles/space.module.less'
import { ToiletSpaceItem } from '../types'
import AbnormalNumber from '../components/AbnormalNumber'
import SpaceValues from './SpaceValues'

interface SpaceProps {
  space: ToiletSpaceItem
}

const Space: FC<SpaceProps> = props => {
  return (
    <div className={cn(styles.space)}>
      <div className={cn(styles.space_header, 'fc')}>
        <div className={cn(styles.space_name)}>{props.space.localName}</div>
        <AbnormalNumber />
      </div>
      <SpaceValues space={props.space} />
    </div>
  )
}

export default Space
