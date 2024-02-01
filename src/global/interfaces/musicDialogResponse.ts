import { READ_MUSIC_STATE } from '@global/constants'

export default interface IMusicDialogResponse {
  filePaths: string[] | null
  info: READ_MUSIC_STATE
}
