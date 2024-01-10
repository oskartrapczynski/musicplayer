import { Slider, Stack } from '@mui/material'
import { VolumeDown, VolumeUp } from '@mui/icons-material'

interface Props {
  direction?: 'row' | 'column'
  width?: string
  volume: number
  changeSongVolume: (volume: number) => void
}

const SliderVolume = ({ direction = 'row', volume, changeSongVolume, width = '100px' }: Props) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    changeSongVolume(newValue as number)
  }
  return (
    <Stack spacing={2} direction={direction} sx={{ mb: 1 }} alignItems="center">
      <VolumeDown />
      <Slider aria-label="Volume" value={volume} onChange={handleChange} sx={{ width }} />
      <VolumeUp />
    </Stack>
  )
}

export default SliderVolume
