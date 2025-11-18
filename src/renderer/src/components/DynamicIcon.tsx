import React, { CSSProperties } from 'react'
import {
  OpenAIOutlined,
  RobotOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  SettingOutlined,
  FileTextOutlined,
  MessageOutlined,
  SearchOutlined,
  PlusOutlined,
  MinusOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  InfoCircleOutlined
} from '@ant-design/icons'
import * as AllIcons from '@ant-design/icons'
// 白名单映射：利于 Tree-shaking，按需打包
const iconMap = {
  openai: OpenAIOutlined,
  robot: RobotOutlined,
  user: UserOutlined,
  logout: LogoutOutlined,
  home: HomeOutlined,
  settings: SettingOutlined,
  file: FileTextOutlined,
  message: MessageOutlined,
  search: SearchOutlined,
  plus: PlusOutlined,
  minus: MinusOutlined,
  checkFilled: CheckCircleFilled,
  closeFilled: CloseCircleFilled,
  info: InfoCircleOutlined
} as const

export type IconName = keyof typeof iconMap

export interface BaseIconProps {
  className?: string
  style?: CSSProperties
  size?: number | string // 便捷设置 fontSize
  color?: string
  spin?: boolean
  rotate?: number
}

// 推荐：白名单动态图标（更小的打包体积）
export function DynamicIcon({
  name,
  size,
  color,
  style,
  ...rest
}: BaseIconProps & { name: IconName }): React.ReactElement | null {
  const C = iconMap[name]
  if (!C) return null
  const merged: CSSProperties = {
    fontSize: size,
    color,
    ...style
  }
  return <C style={merged} {...rest} />
}

// 备选：宽松版字符串名称（会引入全部图标，体积较大）
type AnyIcon = React.ComponentType<{ style?: CSSProperties } & Record<string, unknown>>
const IconsRecord = AllIcons as unknown as Record<string, AnyIcon>

export function LooseIcon({
  name,
  size,
  color,
  style,
  ...rest
}: BaseIconProps & { name: string }): React.ReactElement | null {
  const C = IconsRecord[name]
  if (!C) return null
  const merged: CSSProperties = {
    fontSize: size,
    color,
    ...style
  }
  return <C style={merged} {...rest} />
}
