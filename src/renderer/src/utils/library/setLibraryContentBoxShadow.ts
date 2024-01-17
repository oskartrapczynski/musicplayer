import { IMusicResponse } from '@global/interfaces'
import { useTheme } from '@mui/material'

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

const setLibraryContentBoxShadow = ({
  path,
  player: { filePath, locationSong },
  selected: { playlist }
}: Params) => {
  const { palette } = useTheme()
  if (path === filePath && locationSong === playlist)
    return `${palette.success.main} 0px 0px 25px 0px`
  if (path === filePath && locationSong !== playlist)
    return `${palette.warning.main} 0px 0px 25px 0px`
  return null
}

export default setLibraryContentBoxShadow
