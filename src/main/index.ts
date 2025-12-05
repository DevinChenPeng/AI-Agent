import { app, shell, BrowserWindow, ipcMain, screen, session } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// 禁用 Electron 的安全警告（开发环境可选）
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

function createWindow(): void {
  // 获取主显示器工作区尺寸（不含任务栏）
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: width / 2,
    height: height / 2,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // 打开开发者工具（可选）
  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 基于 electron-vite cli 的渲染进程热重载(HMR)
  // 开发环境加载远程 URL，生产环境加载本地 html 文件
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 当 Electron 完成初始化并准备创建浏览器窗口时会调用此方法
// 某些 API 只能在此事件发生后使用
app.whenReady().then(async () => {
  // 为 Windows 设置应用用户模型 ID
  electronApp.setAppUserModelId('com.electron')

  // 处理 SSL 证书错误（仅在开发环境）
  if (is.dev) {
    // 忽略开发环境的证书错误
    app.commandLine.appendSwitch('ignore-certificate-errors')

    // 处理证书验证错误
    session.defaultSession.setCertificateVerifyProc((request, callback) => {
      console.log(request)
      callback(0) // 0 表示接受证书
    })
  }

  // 在开发环境中通过 F12 默认打开或关闭开发者工具
  // 在生产环境中忽略 CommandOrControl + R
  // 参见 https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC 测试
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // 在 macOS 上，当点击 dock 图标且没有其他窗口打开时，通常会重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口都关闭时退出，但在 macOS 上除外。在 macOS 上，通常应用程序和菜单栏会保持活跃状态，直到用户明确按下 Cmd + Q 退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中您可以包含应用程序其余的主进程特定代码
// 您也可以将它们放在单独的文件中并通过 require 引入到这里
