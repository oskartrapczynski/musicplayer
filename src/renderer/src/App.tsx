import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { IMusicResponse, ILibrary, IResponseFileJSON, IDB, IPlaylist } from '@global/interfaces'
import { DATA_FILE, READ_MUSIC_STATE } from '@global/constants'
import {
  TagsPage,
  Layout,
  LibraryPage,
  PlayerBasicPage,
  PlayerProPage,
  SettingsPage
} from '@renderer/pages'
import { APP_MODE } from '@renderer/constants'
import {
  writeFileJSON,
  readFileJSON,
  readMusicDialog,
  readMusicPath,
  addSongToPlaylist
} from '@renderer/utils'
import { usePlayer } from '@renderer/hooks'
import { SnackbarCloseButton } from '@renderer/components'
import { v4 as uuidv4 } from 'uuid'
import { Box, CircularProgress } from '@mui/material'
import { IReadMusicPath } from './interfaces'

const App = () => {
  const [appMode, setAppMode] = useState(APP_MODE.NORMAL)
  const [library, setLibrary] = useState<ILibrary[] | null>(null)
  const [playlists, setPlaylists] = useState<IPlaylist[] | null>(null)

  const handleLoadDb = async () => {
    try {
      const { data, info }: IResponseFileJSON<IDB> = await readFileJSON(DATA_FILE.DB)
      console.log('info', info)
      // console.log('data', data)
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

  // const db = useMemo(() => audioObj, [])

  const audioObj1 = new Audio(undefined)
  // const audioObj2 = new Audio(undefined)

  const [player, setPlayer] = useState<IMusicResponse & { locationSong: string | undefined }>({
    song: undefined,
    songTags: undefined,
    info: READ_MUSIC_STATE.NOT_LOADED,
    filePath: undefined,
    locationSong: undefined
  })
  // aliasy
  // const { isPlaying:isPlaying1, toggle:toggle1, duration:duration1, changeSongPos:changeSongPos1, songPos:songPos1, currentTime:currentTime1 }
  const {
    isPlaying,
    toggle,
    duration,
    changeSongPos,
    songPos,
    currentTime,
    volume,
    changeSongVolume
  } = usePlayer({
    audioObj: audioObj1,
    src: player.song as string
  })

  const handleReadMusicDialog = async (playlistId?: string) => {
    const { song, songTags, info, filePath } = await readMusicDialog()
    if (
      !song ||
      !filePath ||
      info === READ_MUSIC_STATE.ERROR ||
      info === READ_MUSIC_STATE.NOT_LOADED
    ) {
      enqueueSnackbar('Nie załadowano utwóru', { variant: 'warning' })
      return
    }
    setPlayer({
      song,
      songTags,
      info,
      filePath,
      locationSong: playlistId ? playlistId : DATA_FILE.LIBRARY
    })
    const savedSongInLibrary = library?.filter(({ path }) => path === filePath)
    const newSong = savedSongInLibrary?.length
      ? { ...savedSongInLibrary[0] }
      : { songId: uuidv4(), path: filePath! }

    console.log(newSong)

    const newPlaylist = await addSongToPlaylist({
      playlistId,
      playlists: playlists!,
      songId: newSong.songId
    })

    const newLibrary: ILibrary[] = library ? [...library, newSong] : [newSong]

    const updatedDB = {
      [DATA_FILE.LIBRARY]: savedSongInLibrary?.length ? library! : newLibrary,
      [DATA_FILE.PLAYLISTS]: newPlaylist
    }

    await writeFileJSON(DATA_FILE.DB, updatedDB)
    setLibrary(updatedDB[DATA_FILE.LIBRARY])
    setPlaylists(updatedDB[DATA_FILE.PLAYLISTS])
    enqueueSnackbar('Załadowano utwór', { variant: 'success' })
  }

  const handleReadMusicPath = async ({ filePath, locationSong }: IReadMusicPath) => {
    const data = await readMusicPath(filePath)
    setPlayer({
      song: data?.song,
      songTags: data?.songTags,
      info: data?.info as READ_MUSIC_STATE,
      filePath: data?.filePath,
      userTags: data?.userTags,
      locationSong
    })
  }

  return (
    <>
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
                    isPlaying={isPlaying}
                    toggle={toggle}
                    changeSongPos={changeSongPos}
                    duration={duration}
                    songPos={songPos}
                    currentTime={currentTime}
                    isDisabled={!player.song}
                    setAppMode={setAppMode}
                    volume={volume}
                    changeSongVolume={changeSongVolume}
                    library={library}
                    playlists={playlists}
                    player={player}
                    handleReadMusicPath={handleReadMusicPath}
                  />
                }
              >
                <Route
                  index
                  element={
                    appMode === APP_MODE.NORMAL ? (
                      <PlayerBasicPage
                        handleReadMusicDialog={handleReadMusicDialog}
                        songTags={player.songTags}
                        duration={duration}
                        filePath={player.filePath}
                        userTags={player.userTags}
                      />
                    ) : (
                      <PlayerProPage />
                    )
                  }
                />
                <Route
                  path="/library/*"
                  element={
                    <LibraryPage
                      library={library as ILibrary[]}
                      setLibrary={setLibrary as React.Dispatch<React.SetStateAction<ILibrary[]>>}
                      playlists={playlists as IPlaylist[]}
                      setPlaylists={
                        setPlaylists as React.Dispatch<React.SetStateAction<IPlaylist[]>>
                      }
                      handleReadMusicPath={handleReadMusicPath}
                      handleReadMusicDialog={handleReadMusicDialog}
                      player={player}
                    />
                  }
                />
                <Route path="/tags" element={<TagsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </HashRouter>
        </SnackbarProvider>
      )}
    </>
  )
}

export default App
