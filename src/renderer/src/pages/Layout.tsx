import { Outlet } from 'react-router-dom'
import { Box, CssBaseline } from '@mui/material'
import { MenuApp, MenuControlBottom } from '@renderer/components'
import { APP_MODE } from '@renderer/constants'

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
  setAppMode
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
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Layout
