import { IMusicResponse } from '@global/interfaces'
import { Palette } from '@mui/material'

interface Params {
  path: string
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  selected: {
    playlist: string
    path: string
  }
  palette: Palette
}

const setLibraryContentBoxShadow = ({
  path,
  player1: { filePath, locationSong },
  selected: { playlist },
  palette
}: Params) => {
  if (path === filePath && locationSong === playlist)
    return `${palette.success.main} 0px 0px 25px 0px`
  if (path === filePath && locationSong !== playlist)
    return `${palette.warning.main} 0px 0px 25px 0px`
  return null
}

export default setLibraryContentBoxShadow
