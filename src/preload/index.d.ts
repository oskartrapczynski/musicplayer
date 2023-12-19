import { ElectronAPI } from '@electron-toolkit/preload'
import CustomAPIs from './customApi'

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPIs
  }
}
