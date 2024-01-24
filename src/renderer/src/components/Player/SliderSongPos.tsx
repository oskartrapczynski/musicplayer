import { Box, Slider } from '@mui/material'
import { createSliderMarks, secondsToMusicTime } from '@renderer/utils'
import { SliderSongPosTooltipLabel } from '..'

interface Props {
  width: string | number
  orientation?: 'horizontal' | 'vertical' | undefined
  changeSongPos: (seek: number) => void
  duration: number | null
  currentTime: number
  isDisabled: boolean
  marks?: boolean
}

const SliderSongPos = ({
  width,
  orientation = 'horizontal',
  changeSongPos,
  duration,
  currentTime,
  isDisabled,
  marks
}: Props) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    changeSongPos(newValue as number)
  }
  const hotCues = [null, 50, 100, 200]
  const markCues = marks ? createSliderMarks(hotCues) : undefined

  return (
    <Box
      sx={{
        width: `${width}`
      }}
    >
      <Slider
        orientation={orientation}
        value={currentTime}
        onChange={handleChange}
        max={duration ? duration : 0}
        disabled={isDisabled}
        valueLabelDisplay="auto"
        slots={{
          valueLabel: SliderSongPosTooltipLabel
        }}
        marks={markCues}
      />
    </Box>
  )
}

export default SliderSongPos
