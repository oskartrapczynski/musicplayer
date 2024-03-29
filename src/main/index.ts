import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import {
  handleWriteFileJSON,
  handleDialogMusicFileOpen,
  handleReadFileJSON,
  handleReadMusicFromPath,
  handleDialogExportFile,
  handleDialogImportFile
} from '@main/handlers'
import { FUNCTIONS } from '@global/constants'

const {
  READ_MUSIC_DIALOG,
  READ_MUSIC_PATH,
  READ_FILE_JSON,
  WRITE_FILE_JSON,
  EXPORT_DIALOG_JSON,
  IMPORT_DIALOG_JSON
} = FUNCTIONS

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // webSecurity: true,
      webSecurity: true,
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
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
app.whenReady().then(() => {
  // Set app user model id for windowsAPPEND_LIBRARY_JSON
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle(READ_MUSIC_DIALOG, handleDialogMusicFileOpen)
  // ipcMain.handle('dialog:openMusic', handleDialogMusicFileOpen)
  ipcMain.handle(READ_MUSIC_PATH, handleReadMusicFromPath)
  ipcMain.handle(READ_FILE_JSON, handleReadFileJSON)
  ipcMain.handle(WRITE_FILE_JSON, handleWriteFileJSON)
  ipcMain.handle(EXPORT_DIALOG_JSON, handleDialogExportFile)
  ipcMain.handle(IMPORT_DIALOG_JSON, handleDialogImportFile)

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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
