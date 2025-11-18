import type { ThemeConfig } from 'antd'

// 获取 CSS 变量值的辅助函数
const getCSSVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}

// 创建 Ant Design 主题配置
const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: getCSSVariable('--color-primary') || '#1890ff',
    colorSuccess: getCSSVariable('--color-success') || '#52c41a',
    colorWarning: getCSSVariable('--color-warning') || '#faad14',
    colorError: getCSSVariable('--color-error') || '#f5222d',
    colorInfo: getCSSVariable('--color-info') || '#1890ff',
    colorTextBase: getCSSVariable('--color-text-primary') || '#262626',
    colorBgBase: getCSSVariable('--color-bg-primary') || '#ffffff',
    borderRadius: 4,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
  }
}

export default antdTheme
