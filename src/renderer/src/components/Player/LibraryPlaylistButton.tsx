import { IPlaylist } from '@global/interfaces'
import { removePlaylist, setLibraryPlaylistBoxShadow } from '@renderer/utils'
import { enqueueSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, IconButton, Menu, Stack, TextField, useTheme } from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircleSharp as CheckCircleSharpIcon,
  CancelSharp as CancelSharpIcon
} from '@mui/icons-material'

interface Props {
  icon: React.ReactNode
  playlists?: IPlaylist[]
  setPlaylists?: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  linkPath: string
  text: string
  color?: 'warning' | 'error' | 'success' | 'info' | 'inherit' | 'primary' | 'secondary' | undefined
  selectedPlaylist: string
  locationSong1?: string
  locationSong2?: string
  editPlaylistId?: string
  setEditPlaylistId?: React.Dispatch<React.SetStateAction<string>>
  playlistArrayId?: number
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
  locationSong1,
  locationSong2,
  editPlaylistId,
  setEditPlaylistId,
  playlistArrayId
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isEditName, setIsEditName] = useState(false)
  const thisPlaylist = linkPath.split('/').pop()!
  const [playlistName, setPlaylistName] = useState(text)
  const { palette } = useTheme()
  const boxShadow = setLibraryPlaylistBoxShadow(
    thisPlaylist,
    selectedPlaylist,
    color,
    palette,
    locationSong1,
    locationSong2
  )
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (editPlaylistId !== thisPlaylist && isEditName) setIsEditName(false)
  }, [editPlaylistId])

  const handleChangePlaylistName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPlaylistName(e.target.value)
  }

  const handleEditMenu = () => {
    setEditPlaylistId!(thisPlaylist!)
    setIsEditName(true)
    handleCloseMenu()
  }

  const updatePlaylistName = () => {
    if (!playlists || !playlistArrayId) return
    const newPlaylists: IPlaylist[] = JSON.parse(JSON.stringify(playlists))
    newPlaylists[playlistArrayId].name = playlistName
    setPlaylists!(newPlaylists)
  }

  const restoreEditToDefaults = () => {
    setEditPlaylistId!('')
    setIsEditName(false)
  }

  const handleEditNameSave = () => {
    if (playlistName === text) {
      enqueueSnackbar('Nie wprowadzono zmian!', { variant: 'warning' })
      restoreEditToDefaults()
      return
    }
    updatePlaylistName()
    restoreEditToDefaults()
    enqueueSnackbar('Pomyślnie zmieniono nazwę!', { variant: 'success' })
  }

  const handleEditNameCancel = () => {
    enqueueSnackbar('Anulowano edycję nazwy!', { variant: 'warning' })
    restoreEditToDefaults()
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleDeletePlaylist = async () => {
    if (locationSong1 === thisPlaylist || locationSong2 === thisPlaylist) {
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
          <Button color="warning" startIcon={<EditIcon />} onClick={handleEditMenu}>
            Edytuj
          </Button>
          <Button color="error" startIcon={<DeleteIcon />} onClick={handleDeletePlaylist}>
            Usuń
          </Button>
        </Menu>
      )}
      {isEditName ? (
        <Stack direction="row">
          <TextField value={playlistName} onChange={handleChangePlaylistName} />
          <IconButton color="success" onClick={handleEditNameSave}>
            <CheckCircleSharpIcon />
          </IconButton>
          <IconButton color="error" onClick={handleEditNameCancel}>
            <CancelSharpIcon />
          </IconButton>
        </Stack>
      ) : (
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
      )}
    </>
  )
}

export default LibraryPlaylistButton
