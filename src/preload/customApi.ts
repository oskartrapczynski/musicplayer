import { DATA_FILE, FUNCTIONS } from '@global/constants'
import { IDB, ILibrary, IMusicResponse, IResponseFileJSON } from '@global/interfaces'

const {
  READ_MUSIC_DIALOG,
  READ_MUSIC_PATH,
  READ_FILE_JSON,
  WRITE_FILE_JSON,
  EXPORT_DIALOG_JSON,
  IMPORT_DIALOG_JSON
} = FUNCTIONS

export default interface ICustomAPI {
  [READ_MUSIC_DIALOG]: () => Promise<IMusicResponse> // api
  [READ_MUSIC_PATH]: (_: Electron.IpcMainInvokeEvent, path: string) => Promise<Buffer> //invoke
  [READ_FILE_JSON]: (_: Electron.IpcMainInvokeEvent, type: DATA_FILE) => Promise<JSON> //invoke
  [WRITE_FILE_JSON]: (
    _: Electron.IpcMainInvokeEvent,
    type: DATA_FILE,
    data: ILibrary[]
  ) => Promise<string> //invoke
  [EXPORT_DIALOG_JSON]: (_: Electron.IpcMainInvokeEvent, data: IDB[]) => Promise<boolean> //invoke
  [IMPORT_DIALOG_JSON]: () => Promise<IResponseFileJSON<unknown>> // invoke
}
