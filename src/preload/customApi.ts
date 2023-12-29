import { DATA_FILE, FUNCTIONS } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'

const { READ_MUSIC_DIALOG, READ_MUSIC_PATH, READ_FILE_JSON } = FUNCTIONS

export default interface ICustomAPI {
  [READ_MUSIC_DIALOG]: () => Promise<IMusicResponse> // api
  [READ_MUSIC_PATH]: (_: Electron.IpcMainInvokeEvent, path: string) => Promise<Buffer> //invoke
  [READ_FILE_JSON]: (_: Electron.IpcMainInvokeEvent, type: DATA_FILE) => Promise<JSON> //invoke
}
