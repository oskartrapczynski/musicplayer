import { Button, useTheme } from '@mui/material'
import { setLibraryPlaylistBoxShadow } from '@renderer/utils'
import { Link } from 'react-router-dom'

interface Props {
  icon: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  linkPath: string
  text: string
  color?: 'warning' | 'error' | 'success' | 'info' | 'inherit' | 'primary' | 'secondary' | undefined
  selectedPlaylist: string
}

const LibraryPlaylistButton = ({
  icon,
  onClick,
  linkPath,
  text,
  color,
  selectedPlaylist
}: Props) => {
  const { palette } = useTheme()
  const thisPlaylist = linkPath.split('/').pop()!
  const boxShadow = setLibraryPlaylistBoxShadow(thisPlaylist, selectedPlaylist, color, palette)
  return (
    <Link to={linkPath}>
      <Button
        variant="contained"
        startIcon={icon}
        onClick={onClick}
        color={color}
        sx={{ boxShadow }}
        fullWidth
      >
        {text}
      </Button>
    </Link>
  )
}

export default LibraryPlaylistButton
