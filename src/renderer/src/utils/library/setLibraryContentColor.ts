import { Player } from '@renderer/interfaces'

interface Params {
  path: string
  player1: Player
  player2: Player
  selected: {
    playlist: string
    path: string
  }
}

const setLibraryContentColor = ({
  path: songPath,
  player1: { filePath: filePath1, locationSong: locationSong1 },
  player2: { filePath: filePath2, locationSong: locationSong2 },
  selected: { playlist, path }
}: Params) => {
  if (songPath === path) return 'warning'
  if (
    (songPath === filePath1 && locationSong1 === playlist) ||
    (songPath === filePath2 && locationSong2 === playlist)
  )
    return 'success'
  return 'primary'
}
export default setLibraryContentColor
