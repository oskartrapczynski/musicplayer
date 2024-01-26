import { useState, useEffect } from 'react'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, Box, Button, CircularProgress, Menu, useTheme } from '@mui/material'
import { LibraryContent, InputSearch } from '..'
import {
  getSongsById,
  removeSongFromDb,
  searchPathFromWords,
  setLibraryContentBoxShadow,
  setLibraryContentColor
} from '@renderer/utils'
import { IReadMusicPath, Player } from '@renderer/interfaces'
import {
  LibraryAdd as LibraryAddIcon,
  Delete as DeleteIcon,
  Album as AlbumIcon
} from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import removeSongFromPlaylist from '@renderer/utils/library/removeSongFromPlaylist'
import { APP_MODE, PLAYER } from '@renderer/constants'
import { DATA_FILE } from '@global/constants'

interface Props {
  appMode: APP_MODE
  library: ILibrary[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  playlists: IPlaylist[]
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  setSelected: React.Dispatch<
    React.SetStateAction<{
      playlist: string
      path: string
    }>
  >
  handleLoad: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
  handleReadMusicDialog: (playeId: PLAYER, playlistId?: string) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
  player1: Player
  player2: Player
  selected: {
    playlist: string
    path: string
  }
  type: 'library' | 'playlist'
}

const LibraryPlaylistData = ({
  appMode,
  playlists,
  setPlaylists,
  library,
  setLibrary,
  handleLoad,
  handleReadMusicDialog,
  searchSong,
  setSearchSong,
  player1,
  player2,
  selected,
  setSelected,
  type
}: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<ILibrary[] | null>(null)
  const [deleteSongId, setDeleteSongId] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const { id: currentPlaylistId } = useParams()
  const { palette } = useTheme()

  const isSearchCondition =
    type === 'library'
      ? library && library.length > 0
      : playlists &&
        playlists.filter(({ playlistId }) => selected.playlist === playlistId)[0]?.songs?.length > 0

  useEffect(() => {
    type === 'library' ? loadSongsLibrary() : loadSongsPlaylist()
  }, [searchSong, selected.playlist, playlists, library])

  const loadSongsPlaylist = async () => {
    const playlistArrayId = playlists.findIndex(
      ({ playlistId }) => selected.playlist === playlistId
    )
    if (playlistArrayId === -1) return setFilteredLibrary([])
    const { songs } = playlists[playlistArrayId]
    if (songs.length === 0) return setFilteredLibrary([])

    const playlistSongs = await getSongsById({ library, songIds: songs })

    setFilteredLibrary(
      searchSong ? searchPathFromWords({ library: playlistSongs, searchSong }) : playlistSongs
    )
  }

  const loadSongsLibrary = async () => {
    setFilteredLibrary(searchSong ? searchPathFromWords({ library, searchSong }) : library)
  }

  const handleClickAddSongPlaylist = async (player: PLAYER) =>
    await handleReadMusicDialog(player, currentPlaylistId!)

  const handleClickAddSongLibrary = async (player: PLAYER) => await handleReadMusicDialog(player)

  const handleDeletePlaylist = async () => {
    if (
      selected.playlist === currentPlaylistId! &&
      (selected.path === player1.filePath || selected.path === player2.filePath)
    ) {
      enqueueSnackbar('Nie można usunąć odtwarzanego utworu!', { variant: 'warning' })
      return
    }
    setSelected({ playlist: currentPlaylistId!, path: '' })
    if (!deleteSongId) {
      enqueueSnackbar('Nie wybrano utworu', { variant: 'warning' })
      return
    }
    const data = await removeSongFromPlaylist({
      songId: deleteSongId,
      playlistId: currentPlaylistId!,
      playlists
    })
    setDeleteSongId('')
    if (!data) {
      enqueueSnackbar('Nie usunięto utworu', { variant: 'warning' })
      return
    }
    setPlaylists(data.newPlaylists)
    enqueueSnackbar('Utwór pomyślnie usunięty', { variant: 'success' })
  }

  const handleDeleteLibrary = async () => {
    if (
      selected.playlist === DATA_FILE.LIBRARY &&
      (selected.path === player1.filePath || selected.path === player2.filePath)
    ) {
      enqueueSnackbar('Nie można usunąć odtwarzanego utworu!', { variant: 'warning' })
      return
    }
    setSelected({ playlist: DATA_FILE.LIBRARY, path: '' })
    if (!deleteSongId) {
      enqueueSnackbar('Nie wybrano utworu!', { variant: 'warning' })
      return
    }
    const data = await removeSongFromDb({ songId: deleteSongId, library, playlists })
    setDeleteSongId('')
    if (!data) {
      enqueueSnackbar('Nie usunięto utworu!', { variant: 'warning' })
      return
    }
    setLibrary(data.newLibrary)
    setPlaylists(data.newPlaylists)
    enqueueSnackbar('Utwór pomyślnie usunięty!', { variant: 'success' })
  }

  const handleDoubleClick = (path: string, playlistId?: string) => {
    if (appMode === APP_MODE.PRO) return
    handleLoad({
      filePath: path,
      locationSong: playlistId ? playlistId : DATA_FILE.LIBRARY,
      playerId: PLAYER.one
    })
  }

  const handleDeleteClick = () => {
    type === 'library' ? handleDeleteLibrary() : handleDeletePlaylist()
  }

  const handleClickAddSong = (playerId: PLAYER) => {
    type === 'library' ? handleClickAddSongLibrary(playerId) : handleClickAddSongPlaylist(playerId)
  }

  const handleClickButtonPlaylist = (songId: string, path) => {
    setDeleteSongId(songId)
    setSelected({ playlist: currentPlaylistId ? currentPlaylistId : DATA_FILE.LIBRARY, path })
  }

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    path: string,
    playlistId?: string
  ) => {
    setAnchorEl(event.currentTarget)
    setSelected({ playlist: playlistId ? playlistId : DATA_FILE.LIBRARY, path })
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleMenuClick = (playerId: PLAYER) => {
    if (!selected.path || !selected.playlist) return
    handleLoad({
      filePath: selected.path,
      locationSong: selected.playlist,
      playerId: playerId
    })
    handleCloseMenu()
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
        <Button
          color="success"
          startIcon={<AlbumIcon />}
          onClick={() => handleMenuClick(PLAYER.one)}
        >
          {`Odtwarzaj${appMode === APP_MODE.PRO ? ' 1' : ''}`}
        </Button>
        {appMode === APP_MODE.PRO && (
          <Button
            color="success"
            startIcon={<AlbumIcon />}
            onClick={() => handleMenuClick(PLAYER.two)}
          >
            Odtwarzaj na 2
          </Button>
        )}
      </Menu>
      {!filteredLibrary ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <LibraryContent alignItems={'flex-start'}>
          {isSearchCondition && <InputSearch value={searchSong} setValue={setSearchSong} />}

          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              color="success"
              variant="outlined"
              onClick={() => handleClickAddSong(PLAYER.one)}
              startIcon={<LibraryAddIcon />}
            >
              {`Dodaj utwór${appMode === APP_MODE.PRO ? ' 1' : ''}`}
            </Button>
            {appMode === APP_MODE.PRO && (
              <Button
                color="success"
                variant="outlined"
                onClick={() => handleClickAddSong(PLAYER.two)}
                startIcon={<LibraryAddIcon />}
              >
                Dodaj utwór 2
              </Button>
            )}
            {filteredLibrary && filteredLibrary.length > 0 && (
              <Button
                color="error"
                variant="outlined"
                onClick={handleDeleteClick}
                startIcon={<DeleteIcon />}
              >
                Usuń utwór
              </Button>
            )}
          </Box>

          {filteredLibrary.length > 0 ? (
            <>
              {filteredLibrary.map(({ path, songId }, index) => (
                <Button
                  key={index}
                  sx={{
                    boxShadow: setLibraryContentBoxShadow({
                      path,
                      player1,
                      player2,
                      selected,
                      palette
                    })
                  }}
                  variant="contained"
                  color={setLibraryContentColor({ path, player1, player2, selected })}
                  onClick={() => handleClickButtonPlaylist(songId, path)}
                  onDoubleClick={() => handleDoubleClick(path, currentPlaylistId)}
                  onContextMenu={(e) => handleOpenMenu(e, path, currentPlaylistId)}
                >
                  {getFileName(path)}
                </Button>
              ))}
            </>
          ) : (
            <Alert severity="warning">Lista odtwarzania jest pusta</Alert>
          )}
        </LibraryContent>
      )}
    </>
  )
}

export default LibraryPlaylistData
