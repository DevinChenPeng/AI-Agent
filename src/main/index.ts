import { app, shell, BrowserWindow, ipcMain, screen, session } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { installExtension, REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import icon from '../../resources/icon.png?asset'
// 禁用 Electron 的安全警告（开发环境可选）
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
function createWindow(): void {
  // 获取主显示器工作区尺寸（不含任务栏）
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
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

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // 仅在开发环境安装 React DevTools
  if (is.dev) {
    try {
      // 安装 React DevTools 扩展
      const extensionName = await installExtension(REACT_DEVELOPER_TOOLS, {})
      console.log(`✅ 成功安装扩展：${extensionName}`)
      console.log('💡 提示：打开 DevTools 后，在顶部标签栏查找 "⚛️ Components" 和 "⚛️ Profiler" 标签')
    } catch (err) {
      console.error('❌ 安装 React DevTools 失败：', err)
    }
  }
  // Set app user model id for windows
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

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
