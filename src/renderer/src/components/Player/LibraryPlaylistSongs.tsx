import { useState, useEffect } from 'react'
import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, Box, Button, CircularProgress, useTheme } from '@mui/material'
import { LibraryContent, InputSearch } from '..'
import {
  getSongsById,
  searchPathFromWords,
  setLibraryContentBoxShadow,
  setLibraryContentColor
} from '@renderer/utils'
import { IReadMusicPath } from '@renderer/interfaces'
import { LibraryAdd as LibraryAddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import removeSongFromPlaylist from '@renderer/utils/library/removeSongFromPlaylist'

interface Props {
  playlists: IPlaylist[]
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  library: ILibrary[]
  setSelected: React.Dispatch<
    React.SetStateAction<{
      playlist: string
      path: string
    }>
  >
  handleLoad: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  handleReadMusicDialog: (playlistId?: string) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  selected: {
    playlist: string
    path: string
  }
}

const LibraryPlaylistSongs = ({
  playlists,
  setPlaylists,
  library,
  setSelected,
  handleLoad,
  handleReadMusicDialog,
  searchSong,
  setSearchSong,
  player1,
  selected
}: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<ILibrary[] | null>(null)
  const [deleteSongId, setDeleteSongId] = useState('')
  const { id: currentPlaylistId } = useParams()
  const { palette } = useTheme()

  const loadSongs = async () => {
    const playlistArrayId = playlists.findIndex(
      ({ playlistId }) => selected.playlist === playlistId
    )
    if (playlistArrayId === -1) return setFilteredLibrary([])
    const { songs } = playlists[playlistArrayId]
    if (songs.length === 0) return setFilteredLibrary([])

    const playlistSongs = await getSongsById({ library, songIds: songs })
    // const librarySongsPaths = librarySongs.map(({ path }) => ({
    //   path
    // }))

    setFilteredLibrary(
      searchSong ? searchPathFromWords({ library: playlistSongs, searchSong }) : playlistSongs
    )
  }

  const handleClickAddSongPlaylist = async () => await handleReadMusicDialog(currentPlaylistId!)

  const handleDelete = async () => {
    if (selected.playlist === currentPlaylistId! && selected.path === player1.filePath) {
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

  useEffect(() => {
    loadSongs()
  }, [searchSong, selected.playlist, playlists])

  return (
    <>
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
          {playlists &&
            playlists.filter(({ playlistId }) => selected.playlist === playlistId)[0]?.songs
              ?.length > 0 && <InputSearch value={searchSong} setValue={setSearchSong} />}

          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              color="success"
              variant="outlined"
              onClick={handleClickAddSongPlaylist}
              startIcon={<LibraryAddIcon />}
            >
              Dodaj utwór
            </Button>
            {filteredLibrary && filteredLibrary.length > 0 && (
              <Button
                color="error"
                variant="outlined"
                onClick={handleDelete}
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
                    boxShadow: setLibraryContentBoxShadow({ path, player1, selected, palette })
                  }}
                  variant="contained"
                  color={setLibraryContentColor({ path, player1, selected })}
                  onClick={() => {
                    setDeleteSongId(songId)
                    setSelected({ playlist: currentPlaylistId as string, path })
                  }}
                  onDoubleClick={() =>
                    handleLoad({ filePath: path, locationSong: currentPlaylistId as string })
                  }
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

export default LibraryPlaylistSongs
