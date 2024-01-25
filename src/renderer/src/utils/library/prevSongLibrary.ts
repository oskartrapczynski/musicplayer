import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { PLAYER } from '@renderer/constants'
import { IReadMusicPath } from '../../interfaces'

interface Params {
  library: ILibrary[] | null
  currentPlayingId: number
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
  playerId: PLAYER
}

const prevSongLibrary = async ({
  library,
  currentPlayingId,
  handleReadMusicPath,
  playerId
}: Params) => {
  if (currentPlayingId > 0) {
    await handleReadMusicPath({
      filePath: library![currentPlayingId - 1].path,
      locationSong: DATA_FILE.LIBRARY,
      playerId
    })
  } else {
    await handleReadMusicPath({
      filePath: library![library!.length - 1].path,
      locationSong: DATA_FILE.LIBRARY,
      playerId
    })
  }
}

export default prevSongLibrary
