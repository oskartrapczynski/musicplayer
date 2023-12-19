import { app, shell, BrowserWindow, dialog, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as fs from 'fs'
import { readAudioTags } from './utils'
import { musicResponse, READ_MUSIC_STATE } from '../global'

const readFileJSON = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./db.json', 'utf8', function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data))
    })
  })
}
const readMusicFile = async (path) => {
  return new Promise<Buffer>((resolve, reject) => {
    fs.readFile(path, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
} // sprobowac to uproscic do natywnego roziwazania FS

const handleMusicFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Music files', extensions: ['mp3', 'wav'] }]
  })
  try {
    if (canceled) throw new Error(READ_MUSIC_STATE.CANCELLED)
    const data = await readMusicFile(filePaths[0])
    if (!data) throw new Error(READ_MUSIC_STATE.ERROR)
    const audioTags = readAudioTags(data)
    return {
      song: data,
      filePath: filePaths[0],
      tags: audioTags,
      info: READ_MUSIC_STATE.SUCCESS
    } as musicResponse
  } catch (err) {
    return { song: undefined, info: (err as Error).message }
  }
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      // webSecurity: true,
      webSecurity: false,
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
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('dialog:openMusic', handleMusicFileOpen)
  ipcMain.handle('readFileJSON', readFileJSON)

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
