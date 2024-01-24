import { Outlet } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { MenuApp, MenuControlBottom } from '@renderer/components'
import { APP_MODE } from '@renderer/constants'
import { ILibrary, IPlaylist, IMusicResponse } from '@global/interfaces'
import { IReadMusicPath } from '@renderer/interfaces'

interface Props {
  appMode: APP_MODE
  setAppMode: React.Dispatch<React.SetStateAction<APP_MODE>>
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  isPlaying1: boolean
  toggle1: (play: boolean) => void
  changeSongPos1: (seek: number) => void
  duration1: number | null
  songPos1: number
  currentTime1: number
  isDisabled1: boolean
  volume1: number
  changeSongVolume1: (volume: number) => void
}

const Layout = ({
  appMode,
  setAppMode,
  library,
  playlists,
  handleReadMusicPath,
  player1,
  isPlaying1,
  toggle1,
  changeSongPos1,
  duration1,
  songPos1,
  currentTime1,
  isDisabled1,
  volume1,
  changeSongVolume1
}: Props) => {
  return (
    <>
      <CssBaseline />
      <Box display="flex" width="100%" height="100vh">
        <MenuApp appMode={appMode} setAppMode={setAppMode} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            height: '100vh'
          }}
        >
          <Outlet />
          {appMode === APP_MODE.NORMAL && (
            <MenuControlBottom
              appMode={appMode}
              isPlaying={isPlaying1}
              toggle={toggle1}
              changeSongPos={changeSongPos1}
              duration={duration1}
              songPos={songPos1}
              currentTime={currentTime1}
              isDisabled={isDisabled1}
              volume={volume1}
              changeSongVolume={changeSongVolume1}
              library={library}
              playlists={playlists}
              player1={player1}
              handleReadMusicPath={handleReadMusicPath}
              menuWidth="100%"
            />
          )}
          {appMode === APP_MODE.PRO && (
            <Box display="flex">
              <MenuControlBottom
                appMode={appMode}
                isPlaying={isPlaying1}
                toggle={toggle1}
                changeSongPos={changeSongPos1}
                duration={duration1}
                songPos={songPos1}
                currentTime={currentTime1}
                isDisabled={isDisabled1}
                volume={volume1}
                changeSongVolume={changeSongVolume1}
                library={library}
                playlists={playlists}
                player1={player1}
                handleReadMusicPath={handleReadMusicPath}
                menuWidth="50%"
                marks
              />
              <MenuControlBottom
                appMode={appMode}
                isPlaying={isPlaying1}
                toggle={toggle1}
                changeSongPos={changeSongPos1}
                duration={duration1}
                songPos={songPos1}
                currentTime={currentTime1}
                isDisabled={isDisabled1}
                volume={volume1}
                changeSongVolume={changeSongVolume1}
                library={library}
                playlists={playlists}
                player1={player1}
                handleReadMusicPath={handleReadMusicPath}
                menuWidth="50%"
                marks
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Layout
