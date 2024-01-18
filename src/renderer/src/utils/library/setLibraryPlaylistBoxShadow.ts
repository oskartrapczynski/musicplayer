import { Palette } from '@mui/material'

const setLibraryPlaylistBoxShadow = (
  thisPlaylist: string,
  selectedPlaylist: string,
  color: 'warning' | 'error' | 'success' | 'info' | 'inherit' | 'primary' | 'secondary' | undefined,
  palette: Palette
) => {
  const boxShadowColor = color ? color : 'primary'
  return thisPlaylist === selectedPlaylist
    ? `${palette[`${boxShadowColor}`].main} 0px 0px 25px 0px`
    : undefined
}

export default setLibraryPlaylistBoxShadow
