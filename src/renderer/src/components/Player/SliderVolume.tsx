import { IconButton, Slider, Stack } from '@mui/material'
import { VolumeDown, VolumeUp } from '@mui/icons-material'
import { SliderVolumeTooltipLabel } from '..'

interface Props {
  direction?: 'row' | 'column'
  volume: number
  changeSongVolume: (volume: number) => void
  isDisabled: boolean
  sliderSizeVolume?: 'small' | 'medium'
}

const SliderVolume = ({
  direction = 'row',
  volume,
  changeSongVolume,
  isDisabled,
  sliderSizeVolume
}: Props) => {
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
    <Stack
      flexGrow={1}
      direction={direction}
      sx={{ ml: 2, justifyContent: 'center', alignItems: 'center', maxWidth: 300 }}
    >
      <IconButton onClick={setVolumeMin} disabled={isDisabled}>
        <VolumeDown />
      </IconButton>
      <Slider
        aria-label="Volume"
        size={sliderSizeVolume}
        value={volume}
        onChange={handleChange}
        disabled={isDisabled}
        sx={{ mx: 1, maxWidth: '300px' }}
        valueLabelDisplay="auto"
        slots={{
          valueLabel: SliderVolumeTooltipLabel
        }}
      />
      <IconButton onClick={setVolumeMax} disabled={isDisabled}>
        <VolumeUp />
      </IconButton>
    </Stack>
  )
}

export default SliderVolume
