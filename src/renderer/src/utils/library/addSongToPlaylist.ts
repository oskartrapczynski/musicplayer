import { IPlaylist } from '@global/interfaces'
import { checkIsMusicSavedInPlaylist } from '..'

interface Params {
  playlists: IPlaylist[]
  playlistId?: string
  newSongs: {
    songId: any
    path: string
    hotCues: null[]
  }[]
}

const addSongToPlaylist = async ({ playlists, playlistId, newSongs }: Params) => {
  if (playlistId === undefined || !newSongs.length) return playlists
  const musicNotSavedInPlaylist = newSongs.filter(
    ({ songId }) => !checkIsMusicSavedInPlaylist({ playlists, songId })
  )
  if (!musicNotSavedInPlaylist.length) return playlists
  const songIds = musicNotSavedInPlaylist.map(({ songId }) => songId)
  const playlistArrayId = playlists.findIndex(
    ({ playlistId: playlistIndex }) => playlistIndex === playlistId
  )
  if (playlistArrayId === -1) return playlists
  const newPlaylists: IPlaylist[] = JSON.parse(JSON.stringify(playlists))
  newPlaylists[playlistArrayId].songs.push(...songIds)
  return newPlaylists
}

export default addSongToPlaylist
