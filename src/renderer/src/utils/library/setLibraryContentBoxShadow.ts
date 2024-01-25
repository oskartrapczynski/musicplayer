import { Palette } from '@mui/material'
import { Player } from '@renderer/interfaces'

interface Params {
  path: string
  player1: Player
  player2: Player
  selected: {
    playlist: string
    path: string
  }
  palette: Palette
}

const setLibraryContentBoxShadow = ({
  path,
  player1: { filePath: filePath1, locationSong: locationSong1 },
  player2: { filePath: filePath2, locationSong: locationSong2 },
  selected: { playlist },
  palette
}: Params) => {
  if (
    (path === filePath1 && locationSong1 === playlist) ||
    (path === filePath2 && locationSong2 === playlist)
  )
    return `${palette.success.main} 0px 0px 25px 0px`
  if (
    (path === filePath1 && locationSong1 !== playlist) ||
    (path === filePath2 && locationSong2 !== playlist)
  )
    return `${palette.warning.main} 0px 0px 25px 0px`
  return null
}

export default setLibraryContentBoxShadow
