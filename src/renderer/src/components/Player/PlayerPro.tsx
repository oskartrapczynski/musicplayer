import { ILibrary, IMusicResponse } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Box, Typography, Button, Slider } from '@mui/material'
import { HOT_CUE_LABELS } from '@renderer/constants'
import { HotCue, IMusicLoop } from '@renderer/interfaces'
import { useEffect, useState } from 'react'
import SliderVolumeTooltipLabel from './SliderVolumeTooltipLabel'
import SongImage from './SongImage'

interface Props {
  library: ILibrary[] | null
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[] | null>>
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  setPlayer: React.Dispatch<
    React.SetStateAction<
      IMusicResponse & {
        locationSong: string | undefined
      }
    >
  >
  duration: null | number
  text: string
  volume: number
  changeSongVolume: (volume: number) => void
  isDisabled: boolean
  isPlaying: boolean
  currentTime: number
  changeSongPos: (seek: number) => void
  toggle: (play: boolean) => void
}

const PlayerPro = ({
  library,
  setLibrary,
  player: { filePath, songTags, hotCues: hotCuesProps },
  setPlayer,
  duration,
  text,
  volume,
  changeSongVolume,
  isDisabled,
  isPlaying,
  currentTime,
  changeSongPos,
  toggle
}: Props) => {
  const [hotCues, setHotCues] = useState<HotCue>(hotCuesProps)
  const [loop, setLoop] = useState<IMusicLoop>({ in: null, out: null })

  useEffect(() => {
    setHotCues(hotCuesProps)
  }, [hotCuesProps])

  useEffect(() => {
    if (!loop.in || !loop.out) return
    if (Math.round(currentTime) === Math.round(loop.out)) changeSongPos(loop.in)
  }, [currentTime])

  const resetLoop = () => setLoop({ in: null, out: null })

  const handleChange = (_: Event, newValue: number | number[]) => {
    changeSongVolume(newValue as number)
  }
  const handleHotCueClick = (hotCue: number | null) => {
    if (!hotCue || hotCue > duration!) return
    resetLoop()
    changeSongPos(hotCue)
    if (!isPlaying) toggle(true)
  }

  const handleSetHotCue = (hotCue: number | null, index: number) => {
    if (!duration || isPlaying || currentTime > duration! || hotCue) return
    const newHotCues = hotCues.map((thisHotCue, thisIndex) =>
      thisIndex === index ? currentTime : thisHotCue
    )
    setPlayer((prev) => ({ ...prev, hotCues: newHotCues }))
    setHotCues(newHotCues)
    const newLibrary: ILibrary[] = JSON.parse(JSON.stringify(library))
    const libraryArrayId = newLibrary.findIndex(({ path }) => path === filePath)
    if (libraryArrayId === -1) return
    newLibrary[libraryArrayId].hotCues = newHotCues
    setLibrary(newLibrary)
  }

  const handleLoopIn = () => {
    setLoop((prev) => ({ ...prev, in: currentTime }))
  }
  const handleLoopOut = () => {
    if (!loop.in) return
    setLoop((prev) => ({ ...prev, out: currentTime }))
    changeSongPos(loop.in)
  }

  const handleLoopExit = () => {
    resetLoop()
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
      <Box display="flex" gap={1} width="100%">
        <Button variant={loop.in ? 'contained' : 'outlined'} color="warning" onClick={handleLoopIn}>
          IN
        </Button>
        <Button
          variant={loop.out ? 'contained' : 'outlined'}
          color="warning"
          onClick={handleLoopOut}
        >
          OUT
        </Button>
        <Button
          variant={loop.in && loop.out ? 'contained' : 'outlined'}
          color="warning"
          onClick={handleLoopExit}
        >
          X
        </Button>
      </Box>
      <Box display="flex" gap={1} width="100%">
        {hotCues &&
          hotCues.map((hotCue, index) => (
            <Button
              key={index}
              variant={hotCue ? 'contained' : 'outlined'}
              color="error"
              onClick={() => (hotCue ? handleHotCueClick(hotCue) : handleSetHotCue(hotCue, index))}
            >
              {HOT_CUE_LABELS[index]}
            </Button>
          ))}
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
