import { IPlaylist } from '@global/interfaces'

interface Params {
  playlists: IPlaylist[]
  playlistId?: string
  songId: string
}

const addSongToPlaylist = ({ playlists, playlistId, songId }: Params) => {
  if (playlistId === undefined) return playlists
  const isMusicSavedInPlaylist = playlists?.some(({ songs }) => songs.includes(songId))
  if (isMusicSavedInPlaylist) return playlists
  const playlistArrayId = playlists.findIndex(
    ({ playlistId: playlistIdCb }) => playlistIdCb === playlistId
  )
  if (playlistArrayId === -1) return playlists
  playlists[playlistArrayId].songs.push(songId)
  console.log(playlists)
  return playlists
}

export default addSongToPlaylist
