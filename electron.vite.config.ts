import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-react-compiler',
              {
                target: '19' // keep the compiler aligned with React 19 runtime
              }
            ]
          ]
        }
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          // Less 配置选项
          javascriptEnabled: true
          // 可以添加全局变量
          // modifyVars: {
          //   'primary-color': '#1890ff'
          // }
        }
      }
    }
  }
})
