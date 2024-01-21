import { IPlaylist } from '@global/interfaces'

interface Params {
  playlists: IPlaylist[]
  playlistId: string
}

const removePlaylist = async ({ playlists, playlistId: deletedPlaylistId }: Params) => {
  const copyPlaylists: IPlaylist[] = JSON.parse(JSON.stringify(playlists))
  const newPlaylists = copyPlaylists.filter(({ playlistId }) => playlistId !== deletedPlaylistId)
  return newPlaylists.length === playlists.length ? null : { newPlaylists }
}

export default removePlaylist
