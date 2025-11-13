import { createTheme } from '@mui/material'

// 获取 CSS 变量值的辅助函数
const getCSSVariable = (variableName: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()
}

// 创建 MUI 主题,使用 CSS 变量
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: getCSSVariable('--color-primary') || '#1890ff',
      light: getCSSVariable('--color-primary-light') || '#40a9ff',
      dark: getCSSVariable('--color-primary-dark') || '#096dd9'
    },
    success: {
      main: getCSSVariable('--color-success') || '#52c41a'
    },
    warning: {
      main: getCSSVariable('--color-warning') || '#faad14'
    },
    error: {
      main: getCSSVariable('--color-error') || '#f5222d'
    },
    info: {
      main: getCSSVariable('--color-info') || '#1890ff'
    },
    text: {
      primary: getCSSVariable('--color-text-primary') || '#262626',
      secondary: getCSSVariable('--color-text-secondary') || '#595959',
      disabled: getCSSVariable('--color-text-disabled') || '#bfbfbf'
    },
    background: {
      default: getCSSVariable('--color-bg-primary') || '#ffffff',
      paper: getCSSVariable('--color-bg-secondary') || '#fafafa'
    },
    divider: getCSSVariable('--color-border-primary') || '#d9d9d9'
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  shape: {
    borderRadius: 4 // 对应 --radius-md
  }
})
export default theme
