import { IPlaylist } from '@global/interfaces'
import { removePlaylist, setLibraryPlaylistBoxShadow } from '@renderer/utils'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu, useTheme } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

interface Props {
  icon: React.ReactNode
  playlists?: IPlaylist[]
  setPlaylists?: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  linkPath: string
  text: string
  color?: 'warning' | 'error' | 'success' | 'info' | 'inherit' | 'primary' | 'secondary' | undefined
  selectedPlaylist: string
  locationSong?: string
}

const LibraryPlaylistButton = ({
  icon,
  playlists,
  setPlaylists,
  onClick,
  linkPath,
  text,
  color,
  selectedPlaylist,
  locationSong
}: Props) => {
  const { palette } = useTheme()
  const thisPlaylist = linkPath.split('/').pop()!
  const boxShadow = setLibraryPlaylistBoxShadow(
    thisPlaylist,
    selectedPlaylist,
    color,
    palette,
    locationSong
  )

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleDeletePlaylist = async () => {
    if (locationSong === thisPlaylist) {
      enqueueSnackbar('Nie można usunąć odtwarzanej listy!', { variant: 'warning' })
      return
    }
    const data = await removePlaylist({ playlists: playlists!, playlistId: thisPlaylist })
    if (!data) {
      enqueueSnackbar('Nie usunięto listy odtwarzania!', { variant: 'warning' })
      return
    }
    setPlaylists!(data.newPlaylists)
    enqueueSnackbar('Pomyślnie usunięto listę odtwarzania!', { variant: 'success' })
    handleCloseMenu()
  }

  return (
    <>
      {playlists && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeletePlaylist}>
            Usuń
          </Button>
        </Menu>
      )}
      <Link to={linkPath}>
        <Button
          variant="contained"
          startIcon={icon}
          onClick={onClick}
          onContextMenu={handleOpenMenu}
          color={thisPlaylist === selectedPlaylist ? 'warning' : color}
          sx={{ justifyContent: 'flex-start', boxShadow }}
          fullWidth
        >
          {text}
        </Button>
      </Link>
    </>
  )
}

export default LibraryPlaylistButton
