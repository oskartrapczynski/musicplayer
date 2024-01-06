import { DATA_FILE, FUNCTIONS } from '@global/constants'
import { ILibrary, IMusicResponse } from '@global/interfaces'

const { READ_MUSIC_DIALOG, READ_MUSIC_PATH, READ_FILE_JSON, WRITE_FILE_JSON } = FUNCTIONS

export default interface ICustomAPI {
  [READ_MUSIC_DIALOG]: () => Promise<IMusicResponse> // api
  [READ_MUSIC_PATH]: (_: Electron.IpcMainInvokeEvent, path: string) => Promise<Buffer> //invoke
  [READ_FILE_JSON]: (_: Electron.IpcMainInvokeEvent, type: DATA_FILE) => Promise<JSON> //invoke
  [WRITE_FILE_JSON]: (
    _: Electron.IpcMainInvokeEvent,
    type: DATA_FILE,
    data: ILibrary[]
  ) => Promise<string> //invoke
}
