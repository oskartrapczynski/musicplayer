import { IPlaylist } from '@global/interfaces'

const removeSongFromPlaylist = async ({
  songId: deletedSongId,
  playlistId: deletedPlaylistId,
  playlists
}: {
  songId: string
  playlistId: string
  playlists: IPlaylist[]
}) => {
  const playlistArrayId = playlists.findIndex(({ playlistId }) => playlistId === deletedPlaylistId)
  if (playlistArrayId === -1) return null
  const newPlaylists: IPlaylist[] = JSON.parse(JSON.stringify(playlists))
  const newPlaylistSongs = newPlaylists[playlistArrayId].songs.filter(
    (songId) => songId !== deletedSongId
  )
  newPlaylists[playlistArrayId].songs = newPlaylistSongs
  return { newPlaylists }
}

export default removeSongFromPlaylist
