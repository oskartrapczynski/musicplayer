import { Box, Slider } from '@mui/material'
import { Player } from '@renderer/interfaces'
import { createSliderMarks } from '@renderer/utils'
import { useEffect, useState } from 'react'
import { SliderSongPosTooltipLabel } from '..'

interface Props {
  width: string | number
  orientation?: 'horizontal' | 'vertical' | undefined
  changeSongPos: (seek: number) => void
  duration: number | null
  currentTime: number
  isDisabled: boolean
  marks?: boolean
  player: Player
}

const SliderSongPos = ({
  width,
  orientation = 'horizontal',
  changeSongPos,
  duration,
  currentTime,
  isDisabled,
  marks,
  player: { hotCues }
}: Props) => {
  const [markCues, setMarkCues] = useState<
    | {
        label: string
        value: number
      }[]
    | undefined
  >()
  const handleChange = (_: Event, newValue: number | number[]) => {
    changeSongPos(newValue as number)
  }

  useEffect(() => {
    setMarkCues(marks ? createSliderMarks(hotCues) : undefined)
  }, [hotCues])

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
        step={0.1}
        slots={{
          valueLabel: SliderSongPosTooltipLabel
        }}
        marks={markCues}
      />
    </Box>
  )
}

export default SliderSongPos
