import { Outlet } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { MenuApp, MenuControlBottom } from '@renderer/components'
import { APP_MODE, PLAYER } from '@renderer/constants'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { IReadMusicPath, Player } from '@renderer/interfaces'

interface Props {
  appMode: APP_MODE
  setAppMode: React.Dispatch<React.SetStateAction<APP_MODE>>
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
  player1: Player
  isPlaying1: boolean
  toggle1: (play: boolean) => void
  changeSongPos1: (seek: number) => void
  duration1: number | null
  songPos1: number
  currentTime1: number
  isDisabled1: boolean
  volume1: number
  changeSongVolume1: (volume: number) => void
  player2: Player
  isPlaying2: boolean
  toggle2: (play: boolean) => void
  changeSongPos2: (seek: number) => void
  duration2: number | null
  songPos2: number
  currentTime2: number
  isDisabled2: boolean
  volume2: number
  changeSongVolume2: (volume: number) => void
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
  changeSongVolume1,
  player2,
  isPlaying2,
  toggle2,
  changeSongPos2,
  duration2,
  songPos2,
  currentTime2,
  isDisabled2,
  volume2,
  changeSongVolume2
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
              library={library}
              playlists={playlists}
              menuWidth="100%"
              handleReadMusicPath={handleReadMusicPath}
              isPlaying={isPlaying1}
              toggle={toggle1}
              changeSongPos={changeSongPos1}
              duration={duration1}
              songPos={songPos1}
              currentTime={currentTime1}
              isDisabled={isDisabled1}
              volume={volume1}
              changeSongVolume={changeSongVolume1}
              playerId={PLAYER.one}
              player={player1}
            />
          )}
          {appMode === APP_MODE.PRO && (
            <Box display="flex">
              <MenuControlBottom
                appMode={appMode}
                library={library}
                playlists={playlists}
                menuWidth="50%"
                handleReadMusicPath={handleReadMusicPath}
                isPlaying={isPlaying1}
                toggle={toggle1}
                changeSongPos={changeSongPos1}
                duration={duration1}
                songPos={songPos1}
                currentTime={currentTime1}
                isDisabled={isDisabled1}
                volume={volume1}
                changeSongVolume={changeSongVolume1}
                player={player1}
                playerId={PLAYER.one}
                marks
              />
              <MenuControlBottom
                appMode={appMode}
                library={library}
                playlists={playlists}
                menuWidth="50%"
                handleReadMusicPath={handleReadMusicPath}
                isPlaying={isPlaying2}
                toggle={toggle2}
                changeSongPos={changeSongPos2}
                duration={duration2}
                songPos={songPos2}
                currentTime={currentTime2}
                isDisabled={isDisabled2}
                volume={volume2}
                changeSongVolume={changeSongVolume2}
                player={player2}
                playerId={PLAYER.two}
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
