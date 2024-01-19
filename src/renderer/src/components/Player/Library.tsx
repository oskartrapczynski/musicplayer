import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import {
  AddPlaylist,
  InputSearch,
  LibraryAllSongs,
  LibraryPlaylistButton,
  LibraryPlaylistSongs
} from '..'
import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { DATA_FILE } from '@global/constants'
import { Box, Stack } from '@mui/material'
import { Apps as AppsIcon, List as ListIcon, Add as AddIcon } from '@mui/icons-material'
import { IReadMusicPath } from '@renderer/interfaces'
import { Route, Routes } from 'react-router-dom'
import { ROUTE } from '@renderer/constants'
interface Props {
  library: ILibrary[]
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  handleReadMusicDialog: (playlistId?: string) => Promise<void>
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  player: IMusicResponse & {
    locationSong: string | undefined
  }
}
const Library = ({
  library,
  handleReadMusicPath,
  handleReadMusicDialog,
  playlists,
  setLibrary,
  setPlaylists,
  player
}: Props) => {
  const [selected, setSelected] = useState({
    playlist: `${DATA_FILE.LIBRARY}`,
    path: ''
  })

  const ADD_PLAYLIST = 'add'
  const [searchPlaylist, setSearchPlaylist] = useState('')
  const [searchSong, setSearchSong] = useState('')

  const handleLoad = async ({ filePath, locationSong }: IReadMusicPath) => {
    if (!filePath) {
      enqueueSnackbar('Wybierz utwór aby załadować', { variant: 'warning' })
      return
    }
    return await handleReadMusicPath({ filePath, locationSong })
  }

  const filterPlaylists = ({ name }: IPlaylist) => {
    const searchWords = searchPlaylist.split(' ').map((word) => word.toLowerCase())
    const matchWords = searchWords.map((word) => name.toLowerCase().includes(word))
    return matchWords.filter((item) => item).length === searchWords.length
  }

  console.log(selected)
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          backgroundColor: 'gray'
        }}
      >
        <Box
          sx={{
            width: '30%',
            height: '100%',
            overflow: 'scroll',
            p: 2,
            backgroundColor: '#666',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          <Stack gap={1}>
            <InputSearch value={searchPlaylist} setValue={setSearchPlaylist} />
            <LibraryPlaylistButton
              color="success"
              icon={<AddIcon />}
              onClick={() => setSelected({ playlist: ADD_PLAYLIST, path: '' })}
              text="Dodaj"
              linkPath={`/${ROUTE.LIBRARY}/${ADD_PLAYLIST}`}
              selectedPlaylist={selected.playlist}
            />
            {searchPlaylist ? (
              <>
                {playlists.filter(filterPlaylists).map(({ playlistId, name }, index) => (
                  <LibraryPlaylistButton
                    key={index}
                    icon={<ListIcon />}
                    onClick={() => {
                      setSelected({ playlist: playlistId, path: '' })
                      setSearchPlaylist('')
                    }}
                    text={name}
                    linkPath={`/${ROUTE.LIBRARY}/${playlistId}`}
                    selectedPlaylist={selected.playlist}
                  />
                ))}
              </>
            ) : (
              <>
                <LibraryPlaylistButton
                  color="error"
                  icon={<AppsIcon />}
                  onClick={() => setSelected({ playlist: DATA_FILE.LIBRARY, path: '' })}
                  text="Wszystkie"
                  linkPath={`/${ROUTE.LIBRARY}`}
                  selectedPlaylist={selected.playlist}
                />
                {playlists?.length > 0 &&
                  playlists.map(({ playlistId, name }, index) => (
                    <LibraryPlaylistButton
                      key={index}
                      icon={<ListIcon />}
                      onClick={() => setSelected({ playlist: playlistId, path: '' })}
                      text={name}
                      linkPath={`/${ROUTE.LIBRARY}/${playlistId}`}
                      selectedPlaylist={selected.playlist}
                    />
                  ))}
              </>
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            width: '70%',
            backgroundColor: '#333',
            overflow: 'scroll',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          <Routes>
            <Route
              path={`/${ADD_PLAYLIST}`}
              element={
                <AddPlaylist
                  library={library}
                  playlists={playlists}
                  setLibrary={setLibrary}
                  setPlaylists={setPlaylists}
                />
              }
            />
            <Route
              path="/"
              element={
                <LibraryAllSongs
                  library={library}
                  setSelected={setSelected}
                  handleLoad={handleLoad}
                  handleReadMusicDialog={handleReadMusicDialog}
                  searchSong={searchSong}
                  setSearchSong={setSearchSong}
                  player={player}
                  selected={selected}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <LibraryPlaylistSongs
                  playlists={playlists}
                  library={library}
                  setSelected={setSelected}
                  handleLoad={handleLoad}
                  handleReadMusicDialog={handleReadMusicDialog}
                  searchSong={searchSong}
                  setSearchSong={setSearchSong}
                  player={player}
                  selected={selected}
                />
              }
            />
          </Routes>
        </Box>
      </Box>
    </>
  )
}

export default Library
