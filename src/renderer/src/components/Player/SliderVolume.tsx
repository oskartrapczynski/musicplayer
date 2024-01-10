import { IconButton, Slider, Stack } from '@mui/material'
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
  const setVolumeMin = () => {
    if (volume > 0) changeSongVolume(0)
  }
  const setVolumeMax = () => {
    if (volume < 100) changeSongVolume(100)
  }
  return (
    <Stack spacing={2} direction={direction} sx={{ mb: 1 }} alignItems="center">
      <IconButton onClick={setVolumeMin}>
        <VolumeDown />
      </IconButton>
      <Slider aria-label="Volume" value={volume} onChange={handleChange} sx={{ width }} />
      <IconButton onClick={setVolumeMax}>
        <VolumeUp />
      </IconButton>
    </Stack>
  )
}

export default SliderVolume
