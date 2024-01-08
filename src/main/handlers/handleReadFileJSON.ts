import { DATA_FILE } from '@global/constants'
import { IResponseFileJSON } from '@global/interfaces'
import { readFileJSON } from '@main/utils'

const handleReadFileJSON = async (_: Electron.IpcMainInvokeEvent, dataFile: DATA_FILE) => {
  try {
    const data = await readFileJSON(dataFile)
    return { data, info: 'Read successful' } as IResponseFileJSON
  } catch (err) {
    return { data: null, info: (err as Error).message } as IResponseFileJSON
  }
}

export default handleReadFileJSON
