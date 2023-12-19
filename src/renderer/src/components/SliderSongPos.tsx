import { Box, Slider } from '@mui/material'

interface Props {
  width: string | number
  initPos?: number
  orientation?: 'horizontal' | 'vertical' | undefined
  changeSongPos: (seek: number) => void
  duration: number | null
  currentTime: number
}

const SliderSongPos = ({
  width,
  initPos = 100,
  orientation = 'horizontal',
  changeSongPos,
  duration,
  currentTime
}: Props) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    console.log(newValue)
    changeSongPos(newValue as number)
  }
  return (
    <Box
      sx={{
        width: `${width}`
      }}
    >
      <Slider
        defaultValue={initPos}
        orientation={orientation}
        value={currentTime}
        onChange={handleChange}
        max={duration ? duration : 0}
      />
    </Box>
  )
}

export default SliderSongPos
