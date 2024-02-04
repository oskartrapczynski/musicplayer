import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { ILibrary, IResponseFileJSON, IDB, IPlaylist } from '@global/interfaces'
import { DATA_FILE, READ_MUSIC_STATE } from '@global/constants'
import {
  TagsPage,
  Layout,
  LibraryPage,
  PlayerBasicPage,
  PlayerProPage,
  SettingsPage
} from '@renderer/pages'
import { APP_MODE, PLAYER } from '@renderer/constants'
import {
  writeFileJSON,
  readFileJSON,
  readMusicDialog,
  readMusicPath,
  addSongToPlaylist,
  createNewSong
} from '@renderer/utils'
import { usePlayer } from '@renderer/hooks'
import { SnackbarCloseButton } from '@renderer/components'
import { Box, CircularProgress, createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { IReadMusicPath, Player } from './interfaces'

const App = () => {
  const [appMode, setAppMode] = useState(APP_MODE.NORMAL)
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')
  const [library, setLibrary] = useState<ILibrary[] | null>(null)
  const [playlists, setPlaylists] = useState<IPlaylist[] | null>(null)

  const theme = createTheme({
    palette: {
      mode: colorMode
    }
  })

  const handleLoadDb = async () => {
    try {
      const { data, info }: IResponseFileJSON<IDB> = await readFileJSON(DATA_FILE.DB)
      console.log(info)
      setLibrary(data && data?.library?.length > 0 ? (data.library as ILibrary[]) : [])
      setPlaylists(data && data?.playlists?.length > 0 ? (data.playlists as IPlaylist[]) : [])
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  useEffect(() => {
    handleLoadDb()
  }, [])

  useEffect(() => {
    if (!library || !playlists) return
    writeFileJSON(DATA_FILE.DB, { library, playlists })
  }, [library, playlists])

  const audioObj1 = new Audio(undefined)
  const audioObj2 = new Audio(undefined)

  const [player1, setPlayer1] = useState<Player>({
    song: undefined,
    songTags: undefined,
    info: READ_MUSIC_STATE.NOT_LOADED,
    filePath: undefined,
    locationSong: undefined,
    hotCues: [null, null, null, null]
  })
  const [player2, setPlayer2] = useState<Player>({
    song: undefined,
    songTags: undefined,
    info: READ_MUSIC_STATE.NOT_LOADED,
    filePath: undefined,
    locationSong: undefined,
    hotCues: [null, null, null, null]
  })
  const {
    isPlaying: isPlaying1,
    toggle: toggle1,
    duration: duration1,
    changeSongPos: changeSongPos1,
    songPos: songPos1,
    currentTime: currentTime1,
    volume: volume1,
    changeSongVolume: changeSongVolume1
  } = usePlayer({
    audioObj: audioObj1,
    src: player1.song as string
  })
  const {
    isPlaying: isPlaying2,
    toggle: toggle2,
    duration: duration2,
    changeSongPos: changeSongPos2,
    songPos: songPos2,
    currentTime: currentTime2,
    volume: volume2,
    changeSongVolume: changeSongVolume2
  } = usePlayer({
    audioObj: audioObj2,
    src: player2.song as string
  })

  const handleReadMusicDialog = async (playlistId?: string) => {
    try {
      const { info, filePaths } = await readMusicDialog()
      if (!filePaths || !filePaths.length) throw new Error('Brak wybranych utworów')
      if (info === READ_MUSIC_STATE.ERROR) throw new Error('Błąd podczas ładowania')
      if (info === READ_MUSIC_STATE.NOT_LOADED) throw new Error('Nie załadowano')

      const playlistArrayId =
        playlists && playlists.length && playlistId !== undefined
          ? playlists.findIndex(({ playlistId: playlistIndex }) => playlistIndex === playlistId)
          : null

      const savedInLibrary: ILibrary[] = []
      const notSavedInLibrary: ILibrary[] = []

      filePaths.forEach((filePath) => {
        if (!library || !library.length) return notSavedInLibrary.push(createNewSong(filePath))
        return library.some(({ path }) => path === filePath)
          ? savedInLibrary.push(library!.filter(({ path }) => path === filePath)[0])
          : notSavedInLibrary.push(createNewSong(filePath))
      })

      const newPlaylist = await addSongToPlaylist({
        playlistArrayId,
        playlists: playlists!,
        savedInLibrary,
        notSavedInLibrary
      })

      if (
        playlistArrayId !== null &&
        newPlaylist[playlistArrayId].songs.length === playlists![playlistArrayId].songs.length
      )
        throw new Error('Nie wprowadzono zmian')

      const newLibrary: ILibrary[] = library
        ? [...library, ...notSavedInLibrary]
        : [...notSavedInLibrary]

      if (playlistArrayId === null && library && library.length === newLibrary.length)
        throw new Error('Nie wprowadzono zmian')

      const updatedDB = {
        [DATA_FILE.LIBRARY]: newLibrary,
        [DATA_FILE.PLAYLISTS]: newPlaylist
      }

      await writeFileJSON(DATA_FILE.DB, updatedDB)
      setLibrary(updatedDB[DATA_FILE.LIBRARY])
      setPlaylists(updatedDB[DATA_FILE.PLAYLISTS])
      return enqueueSnackbar('Pomyślnie dodano utwory', { variant: 'success' })
    } catch (err) {
      return enqueueSnackbar((err as Error).message, { variant: 'warning' })
    }
  }

  const handleReadMusicPath = async ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & { playerId: PLAYER }) => {
    const data = await readMusicPath(filePath)
    const setPlayer = playerId === PLAYER.one ? setPlayer1 : setPlayer2
    setPlayer({
      song: data?.song,
      songTags: data?.songTags,
      info: data?.info as READ_MUSIC_STATE,
      filePath: data?.filePath,
      hotCues: data?.hotCues ? data.hotCues : [null, null, null, null],
      locationSong
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!playlists && !library ? (
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress size={'50vh'} />
        </Box>
      ) : (
        <SnackbarProvider
          autoHideDuration={1000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
        >
          <HashRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout
                    appMode={appMode}
                    setAppMode={setAppMode}
                    library={library}
                    playlists={playlists}
                    handleReadMusicPath={handleReadMusicPath}
                    player1={player1}
                    isPlaying1={isPlaying1}
                    toggle1={toggle1}
                    changeSongPos1={changeSongPos1}
                    duration1={duration1}
                    songPos1={songPos1}
                    currentTime1={currentTime1}
                    isDisabled1={!player1.song}
                    volume1={volume1}
                    changeSongVolume1={changeSongVolume1}
                    player2={player2}
                    isPlaying2={isPlaying2}
                    toggle2={toggle2}
                    changeSongPos2={changeSongPos2}
                    duration2={duration2}
                    songPos2={songPos2}
                    currentTime2={currentTime2}
                    isDisabled2={!player2.song}
                    volume2={volume2}
                    changeSongVolume2={changeSongVolume2}
                  />
                }
              >
                <Route
                  index
                  element={
                    appMode === APP_MODE.NORMAL ? (
                      <PlayerBasicPage
                        songTags={player1.songTags}
                        duration={duration1}
                        filePath={player1.filePath}
                      />
                    ) : (
                      <PlayerProPage
                        library={library}
                        setLibrary={setLibrary}
                        player1={player1}
                        setPlayer1={setPlayer1}
                        duration1={duration1}
                        volume1={volume1}
                        changeSongVolume1={changeSongVolume1}
                        isPlaying1={isPlaying1}
                        currentTime1={currentTime1}
                        changeSongPos1={changeSongPos1}
                        toggle1={toggle1}
                        player2={player2}
                        setPlayer2={setPlayer2}
                        duration2={duration2}
                        volume2={volume2}
                        changeSongVolume2={changeSongVolume2}
                        isPlaying2={isPlaying2}
                        currentTime2={currentTime2}
                        changeSongPos2={changeSongPos2}
                        toggle2={toggle2}
                      />
                    )
                  }
                />
                <Route
                  path="/library/*"
                  element={
                    <LibraryPage
                      appMode={appMode}
                      library={library as ILibrary[]}
                      setLibrary={setLibrary as React.Dispatch<React.SetStateAction<ILibrary[]>>}
                      playlists={playlists as IPlaylist[]}
                      setPlaylists={
                        setPlaylists as React.Dispatch<React.SetStateAction<IPlaylist[]>>
                      }
                      handleReadMusicPath={handleReadMusicPath}
                      handleReadMusicDialog={handleReadMusicDialog}
                      player1={player1}
                      player2={player2}
                    />
                  }
                />
                <Route path="/tags" element={<TagsPage />} />
                <Route
                  path="/settings"
                  element={
                    <SettingsPage
                      colorMode={colorMode}
                      setColorMode={setColorMode}
                      library={library}
                      setLibrary={setLibrary}
                      playlists={playlists}
                      setPlaylists={setPlaylists}
                    />
                  }
                />
              </Route>
            </Routes>
          </HashRouter>
        </SnackbarProvider>
      )}
    </ThemeProvider>
  )
}

export default App
