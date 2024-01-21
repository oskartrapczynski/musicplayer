import { IPlaylist } from '@global/interfaces'

interface Params {
  playlists: IPlaylist[]
  playlistId?: string
  songId: string
}

const addSongToPlaylist = async ({ playlists, playlistId, songId }: Params) => {
  if (playlistId === undefined) return playlists
  const isMusicSavedInPlaylist = playlists?.some(({ songs }) => songs.includes(songId))
  if (isMusicSavedInPlaylist) return playlists
  const playlistArrayId = playlists.findIndex(
    ({ playlistId: playlistIdCb }) => playlistIdCb === playlistId
  )
  if (playlistArrayId === -1) return playlists
  const newPlaylists: IPlaylist[] = JSON.parse(JSON.stringify(playlists))
  newPlaylists[playlistArrayId].songs.push(songId)
  return newPlaylists
}

export default addSongToPlaylist
