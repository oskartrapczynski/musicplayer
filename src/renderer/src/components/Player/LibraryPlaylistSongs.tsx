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
import { IReadMusicPath, ISongPath } from '@renderer/interfaces'
import { LibraryAdd as LibraryAddIcon } from '@mui/icons-material'
import { useParams } from 'react-router-dom'

interface Props {
  playlists: IPlaylist[]
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
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  selected: {
    playlist: string
    path: string
  }
}

const LibraryPlaylistSongs = ({
  playlists,
  library,
  setSelected,
  handleLoad,
  handleReadMusicDialog,
  searchSong,
  setSearchSong,
  player,
  selected
}: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<ISongPath[] | null>(null)
  const { id: currentPlaylistId } = useParams()
  const { palette } = useTheme()

  const loadSongs = async () => {
    const playlistArrayId = playlists.findIndex(
      ({ playlistId }) => selected.playlist === playlistId
    )
    if (playlistArrayId === -1) return setFilteredLibrary([])
    const { songs } = playlists[playlistArrayId]
    if (songs.length === 0) return setFilteredLibrary([])

    const librarySongs = await getSongsById({ library, songIds: songs })
    const librarySongsPaths = librarySongs.map(({ path }) => ({
      path
    }))

    setFilteredLibrary(
      searchSong ? searchPathFromWords({ paths: librarySongsPaths, searchSong }) : librarySongsPaths
    )
  }

  const handleClickAddSongPlaylist = async () => await handleReadMusicDialog(currentPlaylistId)

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
          {playlists &&
            playlists.filter(({ playlistId }) => selected.playlist === playlistId)[0]?.songs
              ?.length > 0 && <InputSearch value={searchSong} setValue={setSearchSong} />}
          {!searchSong && (
            <Button onClick={handleClickAddSongPlaylist} startIcon={<LibraryAddIcon />}>
              Dodaj utwór
            </Button>
          )}
          {filteredLibrary.length > 0 ? (
            <>
              {filteredLibrary.map(({ path }, index) => (
                <Button
                  key={index}
                  sx={{
                    boxShadow: setLibraryContentBoxShadow({ path, player, selected, palette })
                  }}
                  variant="contained"
                  color={setLibraryContentColor({ path, player, selected })}
                  onClick={() => setSelected({ playlist: currentPlaylistId as string, path })}
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
