import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { AddPlaylist, InputSearch, LibraryPlaylistButton, LibraryPlaylistData } from '..'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { DATA_FILE } from '@global/constants'
import { Box, Stack, useTheme } from '@mui/material'
import { Apps as AppsIcon, List as ListIcon, Add as AddIcon } from '@mui/icons-material'
import { IReadMusicPath, Player } from '@renderer/interfaces'
import { Route, Routes } from 'react-router-dom'
import { APP_MODE, PLAYER, ROUTE } from '@renderer/constants'
import { grey } from '@mui/material/colors'

interface Props {
  appMode: APP_MODE
  library: ILibrary[]
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
  handleReadMusicDialog: (playlistId?: string) => Promise<void>
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  player1: Player
  player2: Player
}
const Library = ({
  appMode,
  library,
  handleReadMusicPath,
  handleReadMusicDialog,
  playlists,
  setLibrary,
  setPlaylists,
  player1,
  player2
}: Props) => {
  const [selected, setSelected] = useState({
    playlist: `${DATA_FILE.LIBRARY}`,
    path: ''
  })
  const [editPlaylistId, setEditPlaylistId] = useState('')

  const ADD_PLAYLIST = 'add'
  const [searchPlaylist, setSearchPlaylist] = useState('')
  const [searchSong, setSearchSong] = useState('')

  const {
    palette: { mode: colorMode }
  } = useTheme()

  const backgroundColorPlaylists = colorMode === 'light' ? grey[200] : grey[800]
  const backgroundColorContent = colorMode === 'light' ? grey[300] : grey[700]

  const handleLoad = async ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & { playerId: PLAYER }) => {
    if (!filePath) {
      enqueueSnackbar('Wybierz utwór aby załadować', { variant: 'warning' })
      return
    }
    return await handleReadMusicPath({ filePath, locationSong, playerId })
  }

  const filterPlaylists = ({ name }: IPlaylist) => {
    const searchWords = searchPlaylist.split(' ').map((word) => word.toLowerCase())
    const matchWords = searchWords.map((word) => name.toLowerCase().includes(word))
    return matchWords.filter((item) => item).length === searchWords.length
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          height: '100%'
        }}
      >
        <Box
          sx={{
            width: '30%',
            height: '100%',
            overflow: 'scroll',
            p: 2,
            backgroundColor: backgroundColorPlaylists,
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
                    playlists={playlists}
                    setPlaylists={setPlaylists}
                    icon={<ListIcon />}
                    onClick={() => {
                      setSelected({ playlist: playlistId, path: '' })
                      setSearchPlaylist('')
                    }}
                    text={name}
                    linkPath={`/${ROUTE.LIBRARY}/${playlistId}`}
                    selectedPlaylist={selected.playlist}
                    locationSong1={player1.locationSong}
                    locationSong2={player2.locationSong}
                    editPlaylistId={editPlaylistId}
                    setEditPlaylistId={setEditPlaylistId}
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
                      playlists={playlists}
                      setPlaylists={setPlaylists}
                      icon={<ListIcon />}
                      onClick={() => {
                        setSelected({ playlist: playlistId, path: '' })
                        setSearchPlaylist('')
                      }}
                      text={name}
                      linkPath={`/${ROUTE.LIBRARY}/${playlistId}`}
                      selectedPlaylist={selected.playlist}
                      locationSong1={player1.locationSong}
                      locationSong2={player2.locationSong}
                      editPlaylistId={editPlaylistId}
                      setEditPlaylistId={setEditPlaylistId}
                      playlistArrayId={index}
                    />
                  ))}
              </>
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            width: '70%',
            backgroundColor: backgroundColorContent,
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
                <LibraryPlaylistData
                  type="library"
                  appMode={appMode}
                  library={library}
                  setLibrary={setLibrary}
                  playlists={playlists}
                  setPlaylists={setPlaylists}
                  setSelected={setSelected}
                  handleLoad={handleLoad}
                  handleReadMusicDialog={handleReadMusicDialog}
                  searchSong={searchSong}
                  setSearchSong={setSearchSong}
                  selected={selected}
                  player1={player1}
                  player2={player2}
                />
              }
            />
            <Route
              path="/:id"
              element={
                <LibraryPlaylistData
                  type="playlist"
                  appMode={appMode}
                  library={library}
                  setLibrary={setLibrary}
                  playlists={playlists}
                  setPlaylists={setPlaylists}
                  setSelected={setSelected}
                  handleLoad={handleLoad}
                  handleReadMusicDialog={handleReadMusicDialog}
                  searchSong={searchSong}
                  setSearchSong={setSearchSong}
                  selected={selected}
                  player1={player1}
                  player2={player2}
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
