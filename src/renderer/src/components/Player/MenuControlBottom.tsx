import { Prev, Play, Stop, Next, Pause, SliderSongPos, SliderVolume } from '@renderer/components'
import { secondsToMusicTime } from '@renderer/utils'
import { Box, Typography } from '@mui/material'
import { ILibrary, IPlaylist, IMusicResponse } from '@global/interfaces'
import { IReadMusicPath } from '@renderer/interfaces'

interface Props {
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
  showTimer?: boolean
}

const MenuControlBottom = ({
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
  showTimer
}: Props) => {
  return (
    <Box sx={{ width: menuWidth, height: '150px', backgroundColor: 'green' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', height: '100%', padding: 3 }}>
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
        {showTimer && (
          <Typography sx={{ color: isDisabled ? '#005f00' : 'black' }}>{`${secondsToMusicTime(
            currentTime
          )}/${secondsToMusicTime(duration)}`}</Typography>
        )}
        <SliderVolume volume={volume} changeSongVolume={changeSongVolume} isDisabled={isDisabled} />

        <SliderSongPos
          width="100%"
          changeSongPos={changeSongPos}
          duration={duration}
          currentTime={currentTime}
          isDisabled={isDisabled}
        />
      </Box>
    </Box>
  )
}

export default MenuControlBottom
