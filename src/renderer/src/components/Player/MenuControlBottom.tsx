import { Prev, Play, Stop, Next, Pause, SliderSongPos, SliderVolume } from '@renderer/components'
import { secondsToMusicTime } from '@renderer/utils'
import { Box, Typography } from '@mui/material'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { IReadMusicPath, Player } from '@renderer/interfaces'
import { useLocation } from 'react-router-dom'
import { APP_MODE, PLAYER } from '@renderer/constants'

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
  player: Player
  playerId: PLAYER
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
  menuWidth?: string
  marks?: boolean
  sliderSizeVolume?: 'small' | 'medium'
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
  player,
  playerId,
  handleReadMusicPath,
  menuWidth = '100%',
  marks,
  sliderSizeVolume
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
          player={player}
          playerId={playerId}
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
          player={player}
          playerId={playerId}
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
            sliderSizeVolume={sliderSizeVolume}
          />
        )}

        <SliderSongPos
          width="100%"
          changeSongPos={changeSongPos}
          duration={duration}
          currentTime={currentTime}
          isDisabled={isDisabled}
          marks={marks}
          player={player}
        />
      </Box>
    </Box>
  )
}

export default MenuControlBottom
