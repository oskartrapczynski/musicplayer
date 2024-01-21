import { IPlaylist } from '@global/interfaces'

interface Params {
  playlists: IPlaylist[]
  songId: string
}

const checkIsMusicSavedInPlaylist = ({ playlists, songId }: Params) =>
  playlists?.some(({ songs }) => songs.includes(songId))

export default checkIsMusicSavedInPlaylist
