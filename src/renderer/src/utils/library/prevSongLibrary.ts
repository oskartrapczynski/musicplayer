import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { IReadMusicPath } from '../../interfaces'

interface Params {
  library: ILibrary[] | null
  currentPlayingId: number
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
}

const prevSongLibrary = async ({ library, currentPlayingId, handleReadMusicPath }: Params) => {
  if (currentPlayingId > 0) {
    await handleReadMusicPath({
      filePath: library![currentPlayingId - 1].path,
      locationSong: DATA_FILE.LIBRARY
    })
  } else {
    await handleReadMusicPath({
      filePath: library![library!.length - 1].path,
      locationSong: DATA_FILE.LIBRARY
    })
  }
}

export default prevSongLibrary
