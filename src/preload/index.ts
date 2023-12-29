import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { FUNCTIONS } from '@global/constants'

const { READ_MUSIC_DIALOG, READ_MUSIC_PATH, READ_FILE_JSON } = FUNCTIONS

// Custom APIs for renderer
const api = {
  [READ_MUSIC_DIALOG]: () => ipcRenderer.invoke(READ_MUSIC_DIALOG),
  [READ_MUSIC_PATH]: () => ipcRenderer.invoke(READ_MUSIC_PATH),
  [READ_FILE_JSON]: () => ipcRenderer.invoke(READ_FILE_JSON)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
