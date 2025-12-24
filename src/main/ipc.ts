import { ipcMain, Notification } from 'electron'

const ipcPingHandle = (event: Electron.IpcMainEvent, ...args: unknown[]) => {
  console.log(args[0])
}
const ipcNotificationHandle = (event: Electron.IpcMainEvent, ...args: string[]) => {
  const NOTIFICATION_TITLE = 'Basic Notification'
  const NOTIFICATION_BODY = args[0]

  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY
  }).show()
}

export default () => {
  ipcMain.on('ping', ipcPingHandle)
  ipcMain.on('notification', ipcNotificationHandle)
}
