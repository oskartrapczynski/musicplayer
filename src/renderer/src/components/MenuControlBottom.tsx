import { Box } from '@mui/material'
import { Prev, Play, Stop, Next, Pause } from '.'
import { SliderSongPos } from '.'

interface Props {
  isPlaying: boolean
  toggle: () => void
  songPos: number
  changeSongPos: (seek: number) => void
  duration: number | null
  currentTime: number
}

const MenuControlBottom = ({ isPlaying, toggle, changeSongPos, duration, currentTime }: Props) => {
  return (
    <Box sx={{ width: '100%', height: '150px', backgroundColor: 'green' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', padding: 3 }}>
        <Prev />
        {isPlaying ? <Pause toggle={toggle} /> : <Play toggle={toggle} />}
        <Stop />
        <Next />
        {/* <SliderComp width="50%" orientation="vertical" /> */}
        <SliderSongPos
          width="100%"
          initPos={0}
          changeSongPos={changeSongPos}
          duration={duration}
          currentTime={currentTime}
        />
        {/* zmienic slide volume i slider song pos  */}
        {/* przekazac changeSongPos do onchangfe na slider  */}
      </Box>
    </Box>
  )
}

export default MenuControlBottom
