import { IMusicResponse } from '@global/interfaces'

interface Params {
  path: string
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  selected: {
    playlist: string
    path: string
  }
}

const setLibraryContentColor = ({
  path: songPath,
  player1: { filePath, locationSong },
  selected: { playlist, path }
}: Params) => {
  if (songPath === path) return 'warning'
  if (songPath === filePath && locationSong === playlist) return 'success'
  return 'primary'
}
export default setLibraryContentColor
