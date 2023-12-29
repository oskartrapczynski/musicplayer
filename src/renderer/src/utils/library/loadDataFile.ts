import { DATA_FILE, FUNCTIONS } from '@global/constants'

const loadDataFile = async (dataFile: DATA_FILE) => {
  return await window.electron.ipcRenderer.invoke(FUNCTIONS.READ_FILE_JSON, dataFile)
}
export default loadDataFile
