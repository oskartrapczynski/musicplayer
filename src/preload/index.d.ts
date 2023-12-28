import { ElectronAPI } from '@electron-toolkit/preload'
import ICustomAPI from './customApi'

declare global {
  interface Window {
    electron: ElectronAPI
    api: ICustomAPI
  }
}
