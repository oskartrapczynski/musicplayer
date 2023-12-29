import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { IMusicResponse } from '@global/interfaces'
import { DATA_FILE, READ_MUSIC_STATE } from '@global/constants'
import {
  GenresPage,
  Layout,
  LibraryPage,
  PlayerBasicPage,
  PlayerProPage,
  QueuePage,
  SettingsPage
} from '@renderer/pages'
import { APP_MODE } from '@renderer/constants'
import { loadDataFile, readMusicDialog, readMusicPath } from '@renderer/utils'
import { usePlayer } from '@renderer/hooks'
import { SnackbarCloseButton } from '@renderer/components'
import { ILibrary } from '@renderer/interfaces'

const App = () => {
  const [appMode, setAppMode] = useState(APP_MODE.NORMAL)
  const [library, setLibrary] = useState<ILibrary[] | null>(null)
  // change for var from settings.json after read

  const handleLoadDb = async () => {
    try {
      const library: ILibrary[] = await loadDataFile(DATA_FILE.LIBRARY)
      if (library) setLibrary(library)
      console.log(library)
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  useEffect(() => {
    handleLoadDb()
  }, [])

  // const db = useMemo(() => audioObj, [])

  const audioObj1 = new Audio(undefined)
  // const audioObj2 = new Audio(undefined)

  const [player, setPlayer] = useState<IMusicResponse>({
    song: undefined,
    tags: undefined,
    info: READ_MUSIC_STATE.NOT_LOADED,
    filePath: ''
  })
  // aliasy
  // const { isPlaying:isPlaying1, toggle:toggle1, duration:duration1, changeSongPos:changeSongPos1, songPos:songPos1, currentTime:currentTime1 }
  const { isPlaying, toggle, duration, changeSongPos, songPos, currentTime } = usePlayer({
    audioObj: audioObj1,
    src: player.song as string
  })

  const handleReadMusicDialog = async () => {
    const data = await readMusicDialog()
    if (data?.info === READ_MUSIC_STATE.CANCELLED) {
      enqueueSnackbar('Anulowano', { variant: 'warning' })
      return
    }
    if (data?.info === READ_MUSIC_STATE.ERROR) {
      enqueueSnackbar('Błąd podczas otwierania', { variant: 'error' })
      return
    }
    setPlayer({
      song: data?.song,
      tags: data?.tags,
      info: data?.info as READ_MUSIC_STATE,
      filePath: data.filePath
    })
    enqueueSnackbar('Załadowano utwór', { variant: 'success' })
  }

  const handleReadMusicPath = async (path: string) => {
    const data = await readMusicPath(path)
    if (data?.info === READ_MUSIC_STATE.CANCELLED) {
      enqueueSnackbar('Anulowano', { variant: 'warning' })
      return
    }
    if (data?.info === READ_MUSIC_STATE.ERROR) {
      enqueueSnackbar('Błąd podczas otwierania', { variant: 'error' })
      return
    }
    setPlayer({
      song: data?.song,
      tags: data?.tags,
      info: data?.info as READ_MUSIC_STATE,
      filePath: data.filePath
    })
    enqueueSnackbar('Załadowano utwór', { variant: 'success' })
  }

  return (
    <>
      <SnackbarProvider
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      />
      <BrowserRouter>
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
              />
            }
          >
            <Route
              index
              element={
                appMode === APP_MODE.NORMAL ? (
                  <PlayerBasicPage
                    handleReadMusicDialog={handleReadMusicDialog}
                    tags={player.tags}
                    duration={duration}
                    filePath={player.filePath}
                  />
                ) : (
                  <PlayerProPage />
                )
              }
            />
            <Route
              path="/library"
              element={
                <LibraryPage
                  library={library}
                  filePath={player.filePath}
                  handleReadMusicPath={handleReadMusicPath}
                />
              }
            />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
