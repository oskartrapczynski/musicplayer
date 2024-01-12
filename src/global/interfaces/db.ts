import { DATA_FILE } from '@global/constants'
import { ILibrary, IPlaylist } from '.'

export default interface IDB {
  [DATA_FILE.LIBRARY]: ILibrary[]
  [DATA_FILE.PLAYLISTS]: IPlaylist[]
}
