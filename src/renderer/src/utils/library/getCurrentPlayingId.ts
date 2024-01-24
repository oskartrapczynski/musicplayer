import { DATA_FILE } from '@global/constants'
import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { getSongsById } from '..'

interface Params {
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
}

const getCurrentPlayingId = async ({ library, playlists, player1 }: Params) => {
  if (player1.locationSong === DATA_FILE.LIBRARY) {
    if (!library || library.length === 0) return -1
    return library?.findIndex(({ path }) => path === player1.filePath)
  }
  // locationSong = 'playlistId
  if (!playlists || playlists.length === 0) return -1
  const playlistArrayId = playlists?.findIndex(
    ({ playlistId }) => playlistId === player1.locationSong
  )
  if (playlistArrayId === -1) return -1
  const songs = playlists[playlistArrayId].songs
  if (songs.length === 0) return -1

  const librarySongs = await getSongsById({ library, songIds: songs })

  const currentPlayingId = librarySongs.findIndex(({ path }) => path === player1.filePath)

  return currentPlayingId
}
export default getCurrentPlayingId
