import { ILibrary, IPlaylist } from '@global/interfaces'
import { PLAYER } from '@renderer/constants'
import { getSongsById } from '@renderer/utils'
import { IReadMusicPath, Player } from '../../interfaces'

interface Params {
  playlists: IPlaylist[] | null
  player: Player
  currentPlayingId: number
  library: ILibrary[] | null
  playerId: PLAYER
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
}

const nextSongPlaylist = async ({
  playlists,
  player,
  currentPlayingId,
  library,
  handleReadMusicPath,
  playerId
}: Params) => {
  const playlistArrayId = playlists!.findIndex(
    ({ playlistId }) => playlistId === player.locationSong
  )
  const playlistLength = playlists![playlistArrayId].songs.length - 1
  const nextPlaylistSongId = currentPlayingId < playlistLength ? currentPlayingId + 1 : 0
  const nextSongId = playlists![playlistArrayId].songs[nextPlaylistSongId]
  const nextFilePath = await getSongsById({
    library,
    songIds: nextSongId
  })
  await handleReadMusicPath({
    filePath: nextFilePath[0].path,
    locationSong: playlists![playlistArrayId].playlistId,
    playerId
  })
}

export default nextSongPlaylist
