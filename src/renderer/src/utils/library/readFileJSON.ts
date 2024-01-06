import { DATA_FILE, FUNCTIONS } from '@global/constants'

const readFileJSON = async (dataFile: DATA_FILE) =>
  await window.electron.ipcRenderer.invoke(FUNCTIONS.READ_FILE_JSON, dataFile)

export default readFileJSON
