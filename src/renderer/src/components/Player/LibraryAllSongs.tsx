import { DATA_FILE } from '@global/constants'
import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { InputSearch, LibraryContent } from '..'
import { Alert, Box, Button, CircularProgress, useTheme } from '@mui/material'
import {
  searchPathFromWords,
  setLibraryContentColor,
  setLibraryContentBoxShadow
} from '@renderer/utils'
import { IReadMusicPath } from '@renderer/interfaces'
import { useEffect, useState } from 'react'
import { LibraryAdd as LibraryAddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { enqueueSnackbar } from 'notistack'
import removeSongFromDb from '@renderer/utils/library/removeSongFromDb'

interface Props {
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
  handleLoad: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  handleReadMusicDialog: (playlistId?: string) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  selected: {
    playlist: string
    path: string
  }
}

const LibraryAllSongs = ({
  library,
  setLibrary,
  playlists,
  setPlaylists,
  setSelected,
  selected,
  handleLoad,
  handleReadMusicDialog,
  searchSong,
  setSearchSong,
  player
}: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<ILibrary[] | null>(null)
  const [deleteSongId, setDeleteSongId] = useState('')
  const { palette } = useTheme()

  const loadSongs = async () => {
    setFilteredLibrary(searchSong ? searchPathFromWords({ library, searchSong }) : library)
  }

  const handleClickAddSongLibrary = async () => await handleReadMusicDialog()

  const handleDelete = async () => {
    if (selected.playlist === DATA_FILE.LIBRARY && selected.path === player.filePath) {
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
    console.log(data)
    if (!data) {
      enqueueSnackbar('Nie usunięto utworu!', { variant: 'warning' })
      return
    }
    console.log(data)
    setLibrary(data.newLibrary)
    setPlaylists(data.newPlaylists)
    enqueueSnackbar('Utwór pomyślnie usunięty!', { variant: 'success' })
  }

  useEffect(() => {
    loadSongs()
  }, [searchSong, selected.playlist, library])

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
          {library && library.length > 0 && (
            <InputSearch value={searchSong} setValue={setSearchSong} />
          )}
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
              color="success"
              variant="outlined"
              onClick={handleClickAddSongLibrary}
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

          {filteredLibrary && filteredLibrary.length > 0 ? (
            <>
              {filteredLibrary.map(({ path, songId }, index) => (
                <Button
                  key={index}
                  sx={{
                    boxShadow: setLibraryContentBoxShadow({ path, player, selected, palette })
                  }}
                  variant="contained"
                  fullWidth
                  color={setLibraryContentColor({ path, player, selected })}
                  onClick={() => {
                    setDeleteSongId(songId)
                    setSelected({ playlist: DATA_FILE.LIBRARY, path })
                  }}
                  onDoubleClick={() =>
                    handleLoad({ filePath: path, locationSong: DATA_FILE.LIBRARY })
                  }
                >
                  {getFileName(path)}
                </Button>
              ))}
            </>
          ) : (
            <Alert severity="warning">Biblioteka jest pusta</Alert>
          )}
        </LibraryContent>
      )}
    </>
  )
}

export default LibraryAllSongs
