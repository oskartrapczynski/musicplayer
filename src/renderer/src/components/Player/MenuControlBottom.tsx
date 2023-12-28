import { Prev, Play, Stop, Next, Pause, SliderSongPos } from '@renderer/components'
import { secondsToMusicTime } from '@renderer/utils'
import { Box, Typography } from '@mui/material'

interface Props {
  isPlaying: boolean
  toggle: (play: boolean) => void
  songPos: number
  changeSongPos: (seek: number) => void
  duration: number | null
  currentTime: number
  isDisabled: boolean
}

const MenuControlBottom = ({
  isPlaying,
  toggle,
  changeSongPos,
  duration,
  currentTime,
  isDisabled
}: Props) => {
  return (
    <Box sx={{ width: '100%', height: '150px', backgroundColor: 'green' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: 3 }}>
        <Prev isDisabled={isDisabled} />
        {isPlaying ? (
          <Pause toggle={toggle} isDisabled={isDisabled} />
        ) : (
          <Play toggle={toggle} isDisabled={isDisabled} />
        )}
        <Stop isDisabled={isDisabled} toggle={toggle} changeSongPos={changeSongPos} />
        <Next isDisabled={isDisabled} />
        {!isDisabled && (
          <Typography>{`${secondsToMusicTime(currentTime)}/${secondsToMusicTime(
            duration
          )}`}</Typography>
        )}

        <SliderSongPos
          width="100%"
          initPos={0}
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
