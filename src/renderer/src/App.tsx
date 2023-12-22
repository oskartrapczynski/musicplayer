// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { useState } from 'react'
import { Genres, Layout, PlayerBasic, PlayerPro, Playlist, Settings } from '@renderer/pages'
import { APP_MODE } from '@renderer/constants'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MusicResponse, READ_MUSIC_STATE } from '@global'
import { openDialogMusicFile } from './utils'
import { usePlayer } from './hooks'

const App = () => {
  const [appMode, setAppMode] = useState(APP_MODE.NORMAL)
  // change for var from settings.json after read

  const audioObj1 = new Audio(undefined)
  // const audioObj2 = new Audio(undefined)

  const [player, setPlayer] = useState<MusicResponse>({
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

  const handleOpenMusicFile = async () => {
    const data = await openDialogMusicFile()
    // setSrc(data.song)
    if (data?.info === READ_MUSIC_STATE.ERROR || data?.info === READ_MUSIC_STATE.CANCELLED) return
    setPlayer({ song: data?.song, tags: data?.tags, info: data?.info as READ_MUSIC_STATE })
  }

  return (
    <>
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
                  <PlayerBasic
                    handleOpenMusicFile={handleOpenMusicFile}
                    tags={player.tags}
                    duration={duration}
                  />
                ) : (
                  <PlayerPro />
                )
              }
            />
            <Route path="/playlists" element={<Playlist />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
