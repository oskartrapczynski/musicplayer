import { IMusicResponse } from '@global/interfaces'

interface Params {
  path: string
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  selected: {
    playlist: string
    path: string
  }
}

const setLibraryContentColor = ({
  path: songPath,
  player: { filePath, locationSong },
  selected: { playlist, path }
}: Params) => {
  if (songPath === filePath && locationSong === playlist) return 'success'
  if (songPath === path) return 'warning'
  return 'primary'
}
export default setLibraryContentColor
