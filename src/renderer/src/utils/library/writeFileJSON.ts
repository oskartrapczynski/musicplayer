import { DATA_FILE, FUNCTIONS } from '@global/constants'
import { ILibrary } from '@global/interfaces'

const writeFileJSON = async (dataFile: DATA_FILE, content: ILibrary[]) =>
  await window.electron.ipcRenderer.invoke(FUNCTIONS.WRITE_FILE_JSON, dataFile, content)

export default writeFileJSON
