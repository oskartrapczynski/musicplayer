import { DATA_FILE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'

export default interface ICustomAPI {
  openMusic: () => Promise<IMusicResponse> // api
  readFileJSON: (_: Electron.IpcMainInvokeEvent, type: DATA_FILE) => Promise<JSON> //invoke
}
