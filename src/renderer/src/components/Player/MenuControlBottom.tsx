import { Prev, Play, Stop, Next, Pause, SliderSongPos, SliderVolume } from '@renderer/components'
import { secondsToMusicTime } from '@renderer/utils'
import { Box, Stack, Typography } from '@mui/material'
import { ILibrary, IPlaylist, IMusicResponse } from '@global/interfaces'
import { IReadMusicPath } from '@renderer/interfaces'
import { useLocation } from 'react-router-dom'
import { APP_MODE } from '@renderer/constants'

interface Props {
  appMode: APP_MODE
  isPlaying: boolean
  toggle: (play: boolean) => void
  songPos: number
  changeSongPos: (seek: number) => void
  duration: number | null
  currentTime: number
  isDisabled: boolean
  volume: number
  changeSongVolume: (volume: number) => void
  locationSong?: string
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  menuWidth?: string
  marks?: boolean
}

const MenuControlBottom = ({
  appMode,
  isPlaying,
  toggle,
  changeSongPos,
  duration,
  currentTime,
  isDisabled,
  volume,
  changeSongVolume,
  library,
  playlists,
  player1,
  handleReadMusicPath,
  menuWidth = '100%',
  marks
}: Props) => {
  const { pathname } = useLocation()
  return (
    <Box sx={{ width: menuWidth, height: '150px', backgroundColor: 'green' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: 3
        }}
      >
        <Prev
          isDisabled={isDisabled}
          library={library}
          playlists={playlists}
          player1={player1}
          handleReadMusicPath={handleReadMusicPath}
        />
        {isPlaying ? (
          <Pause toggle={toggle} isDisabled={isDisabled} />
        ) : (
          <Play toggle={toggle} isDisabled={isDisabled} />
        )}
        <Stop isDisabled={isDisabled} toggle={toggle} changeSongPos={changeSongPos} />
        <Next
          isDisabled={isDisabled}
          library={library}
          playlists={playlists}
          player1={player1}
          handleReadMusicPath={handleReadMusicPath}
        />
        {pathname === '/' && appMode === APP_MODE.PRO ? (
          <Typography>{`${secondsToMusicTime(currentTime)}/${secondsToMusicTime(
            duration
          )}`}</Typography>
        ) : (
          <SliderVolume
            volume={volume}
            changeSongVolume={changeSongVolume}
            isDisabled={isDisabled}
          />
        )}

        <SliderSongPos
          width="100%"
          changeSongPos={changeSongPos}
          duration={duration}
          currentTime={currentTime}
          isDisabled={isDisabled}
          marks={marks}
        />
      </Box>
    </Box>
  )
}

export default MenuControlBottom
