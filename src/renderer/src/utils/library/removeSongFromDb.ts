import { ILibrary, IPlaylist } from '@global/interfaces'

interface Params {
  songId: string
  library: ILibrary[]
  playlists: IPlaylist[]
}

const removeSongFromDb = async ({ songId: deletedSongId, library, playlists }: Params) => {
  const copyLibrary: ILibrary[] = JSON.parse(JSON.stringify(library))
  const copyPlaylists: IPlaylist[] = JSON.parse(JSON.stringify(playlists))
  const newLibrary = copyLibrary?.filter(({ songId }) => songId !== deletedSongId)
  if (newLibrary.length === library.length) return null
  const newPlaylists = copyPlaylists.map((playlist) => {
    if (!playlist.songs.includes(deletedSongId)) return playlist
    return {
      ...playlist,
      songs: playlist.songs.filter((songId) => songId !== deletedSongId)
    }
  })
  return { newLibrary, newPlaylists }
}

export default removeSongFromDb
