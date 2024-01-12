import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
import { IMusicResponse, ILibrary, IResponseFileJSON, IDB, IPlaylist } from '@global/interfaces'
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
import { writeFileJSON, readFileJSON, readMusicDialog, readMusicPath } from '@renderer/utils'
import { usePlayer } from '@renderer/hooks'
import { SnackbarCloseButton } from '@renderer/components'
import { v4 as uuidv4 } from 'uuid'

const App = () => {
  const [appMode, setAppMode] = useState(APP_MODE.NORMAL)
  const [library, setLibrary] = useState<ILibrary[]>([])
  const [playlists, setPlaylists] = useState<IPlaylist[]>([])

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

  // const db = useMemo(() => audioObj, [])

  const audioObj1 = new Audio(undefined)
  // const audioObj2 = new Audio(undefined)

  const [player, setPlayer] = useState<IMusicResponse>({
    song: undefined,
    songTags: undefined,
    info: READ_MUSIC_STATE.NOT_LOADED,
    filePath: undefined
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

  const handleReadMusicDialog = async () => {
    const { song, songTags, info, filePath } = await readMusicDialog()
    setPlayer({
      song,
      songTags,
      info,
      filePath
    })
    if (!song || !filePath) return
    const isMusicSaved = library?.some((item) => item.path === filePath)
    console.log(isMusicSaved)
    if (!isMusicSaved) {
      const newSong = { songId: uuidv4(), path: filePath! } as ILibrary
      const newLibrary: ILibrary[] = library ? [...library, newSong] : [newSong]
      const updatedDB = { [DATA_FILE.LIBRARY]: newLibrary, [DATA_FILE.PLAYLISTS]: playlists }
      await writeFileJSON(DATA_FILE.DB, updatedDB)
      setLibrary(newLibrary)
    }
    // if (!isMusicSaved) console.log(data.filePath!)
    enqueueSnackbar('Załadowano utwór', { variant: 'success' })
  }

  const handleReadMusicPath = async (filePath: string) => {
    const data = await readMusicPath(filePath)
    console.log(data?.userTags)
    setPlayer({
      song: data?.song,
      songTags: data?.songTags,
      info: data?.info as READ_MUSIC_STATE,
      filePath: data?.filePath,
      userTags: data?.userTags
    })
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
              path="/library"
              element={
                <LibraryPage
                  library={library}
                  playlists={playlists}
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
      </HashRouter>
    </>
  )
}

export default App
