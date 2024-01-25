import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { PLAYER } from '@renderer/constants'
import { IReadMusicPath } from '../../interfaces'

interface Params {
  library: ILibrary[] | null
  currentPlayingId: number
  playerId: PLAYER
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
}

const nextSongLibrary = async ({
  library,
  currentPlayingId,
  handleReadMusicPath,
  playerId
}: Params) => {
  if (currentPlayingId < library!.length - 1) {
    await handleReadMusicPath({
      filePath: library![currentPlayingId + 1].path,
      locationSong: DATA_FILE.LIBRARY,
      playerId
    })
  } else {
    await handleReadMusicPath({
      filePath: library![0].path,
      locationSong: DATA_FILE.LIBRARY,
      playerId
    })
  }
}

export default nextSongLibrary
