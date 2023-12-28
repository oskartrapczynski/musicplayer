import { DATA_FILE } from '@global/constants'

const loadLibrary = async () => {
  return await window.electron.ipcRenderer.invoke('readFileJSON', DATA_FILE.LIBRARY)
}
export default loadLibrary
