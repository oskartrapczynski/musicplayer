import { DATA_FILE } from '@global/constants'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { Player } from '@renderer/interfaces'
import { getSongsById } from '..'

interface Params {
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  player: Player
}

const getCurrentPlayingId = async ({ library, playlists, player }: Params) => {
  if (player.locationSong === DATA_FILE.LIBRARY) {
    if (!library || library.length === 0) return -1
    return library?.findIndex(({ path }) => path === player.filePath)
  }
  // locationSong = 'playlistId
  if (!playlists || playlists.length === 0) return -1
  const playlistArrayId = playlists?.findIndex(
    ({ playlistId }) => playlistId === player.locationSong
  )
  if (playlistArrayId === -1) return -1
  const songs = playlists[playlistArrayId].songs
  if (songs.length === 0) return -1

  const librarySongs = await getSongsById({ library, songIds: songs })

  const currentPlayingId = librarySongs.findIndex(({ path }) => path === player.filePath)

  return currentPlayingId
}
export default getCurrentPlayingId
