import { IconButton, Slider, Stack } from '@mui/material'
import { VolumeDown, VolumeUp } from '@mui/icons-material'

interface Props {
  direction?: 'row' | 'column'
  volume: number
  changeSongVolume: (volume: number) => void
  isDisabled: boolean
}

const SliderVolume = ({ direction = 'row', volume, changeSongVolume, isDisabled }: Props) => {
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
    <Stack flexGrow={1} spacing={2} direction={direction} sx={{ mb: 1 }} alignItems="center">
      <IconButton onClick={setVolumeMin} disabled={isDisabled}>
        <VolumeDown />
      </IconButton>
      <Slider
        aria-label="Volume"
        value={volume}
        onChange={handleChange}
        disabled={isDisabled}
        sx={{ maxWidth: '300px' }}
      />
      <IconButton onClick={setVolumeMax} disabled={isDisabled}>
        <VolumeUp />
      </IconButton>
    </Stack>
  )
}

export default SliderVolume
