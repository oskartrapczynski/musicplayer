import { Outlet } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { MenuApp, MenuControlBottom } from '@renderer/components'
import { APP_MODE } from '@renderer/constants'
import { ILibrary, IPlaylist, IMusicResponse } from '@global/interfaces'
import { IReadMusicPath } from '@renderer/interfaces'

interface Props {
  appMode: APP_MODE
  isPlaying: boolean
  toggle: (play: boolean) => void
  changeSongPos: (seek: number) => void
  duration: number | null
  songPos: number
  currentTime: number
  isDisabled: boolean
  setAppMode: React.Dispatch<React.SetStateAction<APP_MODE>>
  volume: number
  changeSongVolume: (volume: number) => void
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
}

const Layout = ({
  appMode,
  isPlaying,
  toggle,
  changeSongPos,
  duration,
  songPos,
  currentTime,
  isDisabled,
  setAppMode,
  volume,
  changeSongVolume,
  library,
  playlists,
  player,
  handleReadMusicPath
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
              isPlaying={isPlaying}
              toggle={toggle}
              changeSongPos={changeSongPos}
              duration={duration}
              songPos={songPos}
              currentTime={currentTime}
              isDisabled={isDisabled}
              volume={volume}
              changeSongVolume={changeSongVolume}
              library={library}
              playlists={playlists}
              player={player}
              handleReadMusicPath={handleReadMusicPath}
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Layout
