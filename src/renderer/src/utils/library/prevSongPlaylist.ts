import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { getSongsById } from '@renderer/utils'
import { IReadMusicPath } from '../../interfaces'

interface Params {
  playlists: IPlaylist[] | null
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  currentPlayingId: number
  library: ILibrary[] | null
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
}

const prevSongPlaylist = async ({
  playlists,
  player,
  currentPlayingId,
  library,
  handleReadMusicPath
}: Params) => {
  const playlistArrayId = playlists!.findIndex(
    ({ playlistId }) => playlistId === player.locationSong
  )
  const playlistLength = playlists![playlistArrayId].songs.length - 1
  const nextPlaylistSongId = currentPlayingId > 0 ? currentPlayingId - 1 : playlistLength
  const nextSongId = playlists![playlistArrayId].songs[nextPlaylistSongId]
  const nextFilePath = await getSongsById({
    library,
    songIds: nextSongId
  })
  await handleReadMusicPath({
    filePath: nextFilePath[0].path,
    locationSong: playlists![playlistArrayId].playlistId
  })
}

export default prevSongPlaylist
