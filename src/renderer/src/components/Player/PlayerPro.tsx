import { IMusicResponse } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Box, Typography, Button, Slider } from '@mui/material'
import SliderVolumeTooltipLabel from './SliderVolumeTooltipLabel'
import SongImage from './SongImage'

interface Props {
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  duration: null | number
  text: string
  volume: number
  changeSongVolume: (volume: number) => void
  isDisabled: boolean
}

const PlayerPro = ({
  player: { filePath, songTags },
  duration,
  text,
  volume,
  changeSongVolume,
  isDisabled
}: Props) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    changeSongVolume(newValue as number)
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100%',
        px: 2
      }}
    >
      <Box width="100%">
        <Box gap={1} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <SongImage height="50px" width="50px" songTags={songTags} />
          <Typography sx={{ textTransform: 'uppercase' }}>{text}</Typography>
        </Box>
        <Typography>{`Nazwa: ${filePath ? getFileName(filePath) : '-'}`}</Typography>
        <Typography>{`Tytuł: ${songTags?.title ? songTags?.title : '-'}`}</Typography>
        <Typography>{`Autor: ${songTags?.artist ? songTags?.artist : '-'}`}</Typography>
      </Box>
      <Box width="100%">
        <Button variant="contained" color="warning">
          IN
        </Button>
        <Button variant="contained" color="warning">
          OUT
        </Button>
        <Button variant="contained" color="warning">
          X
        </Button>
      </Box>
      <Box width="100%">
        <Button variant="outlined">A</Button>
        <Button variant="outlined">B</Button>
        <Button variant="outlined">C</Button>
        <Button variant="outlined">D</Button>
      </Box>
      <Box>
        <Slider
          aria-label="Volume"
          disabled={isDisabled}
          value={volume}
          onChange={handleChange}
          orientation="vertical"
          sx={{ height: '100px' }}
          valueLabelDisplay="auto"
          slots={{ valueLabel: SliderVolumeTooltipLabel }}
        />
      </Box>
    </Box>
  )
}

export default PlayerPro
