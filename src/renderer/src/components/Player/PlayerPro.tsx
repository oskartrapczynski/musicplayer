import { useEffect, useState } from 'react'
import { SliderVolume, SongImage } from '..'
import { ILibrary } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { HotCue, IMusicLoop, Player } from '@renderer/interfaces'
import { HOT_CUE_LABELS } from '@renderer/constants'
import { Box, Typography, Button, Menu } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

interface Props {
  library: ILibrary[] | null
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[] | null>>
  player: Player
  setPlayer: React.Dispatch<React.SetStateAction<Player>>
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [deletedHotCueId, setDeletedHotCueId] = useState<number | null>(null)

  useEffect(() => {
    setHotCues(hotCuesProps)
  }, [hotCuesProps])

  useEffect(() => {
    if (!loop.in || !loop.out) return
    if (Math.round(currentTime) === Math.round(loop.out)) changeSongPos(loop.in)
  }, [currentTime])

  const resetLoop = () => setLoop({ in: null, out: null })

  const deleteHotCue = () => {
    const newHotCues = hotCues.map((thisHotCue, thisIndex) =>
      thisIndex === deletedHotCueId ? null : thisHotCue
    )
    console.log(deletedHotCueId)
    console.log(newHotCues)
    updateHotCuesLibrary(newHotCues)
    setDeletedHotCueId(null)
  }

  const updateHotCuesLibrary = (newHotCues: HotCue) => {
    setPlayer((prev) => ({ ...prev, hotCues: newHotCues }))
    setHotCues(newHotCues)
    const newLibrary: ILibrary[] = JSON.parse(JSON.stringify(library))
    const libraryArrayId = newLibrary.findIndex(({ path }) => path === filePath)
    if (libraryArrayId === -1) return
    newLibrary[libraryArrayId].hotCues = newHotCues
    setLibrary(newLibrary)
  }

  const changeHotCue = (index: number) => {
    if (duration === null || isPlaying || currentTime > duration!) return
    const newHotCues = hotCues.map((thisHotCue, thisIndex) =>
      thisIndex === index ? currentTime : thisHotCue
    )
    updateHotCuesLibrary(newHotCues)
  }
  const handleLoopIn = () => {
    setLoop((prev) => ({ ...prev, in: currentTime }))
  }
  const handleLoopOut = () => {
    if (loop.in === null) return
    const loopOutVal = currentTime + 0.1 < duration! ? currentTime + 0.1 : currentTime
    setLoop((prev) => ({ ...prev, out: loopOutVal }))
    changeSongPos(loop.in)
  }

  const handleHotCueClick = (hotCue: number | null, hotCueIndex: number) => {
    if (hotCue && hotCue > duration!) return

    if (hotCue === null) return changeHotCue(hotCueIndex)
    resetLoop()
    changeSongPos(hotCue!)
    if (!isPlaying) toggle(true)
  }

  const handleLoopExit = () => {
    resetLoop()
  }

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, hotCueIndex: number) => {
    if (hotCues[hotCueIndex] === null) return
    setAnchorEl(event.currentTarget)
    setDeletedHotCueId(hotCueIndex)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleMenuClick = () => {
    deleteHotCue()
    handleCloseMenu()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: '100%',
        px: 2
      }}
    >
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Button color="error" startIcon={<CloseIcon />} onClick={handleMenuClick}>
          Usuń
        </Button>
      </Menu>
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
              onClick={() => handleHotCueClick(hotCue, index)}
              onContextMenu={(e) => handleOpenMenu(e, index)}
            >
              {HOT_CUE_LABELS[index]}
            </Button>
          ))}
      </Box>
      <SliderVolume volume={volume} changeSongVolume={changeSongVolume} isDisabled={isDisabled} />
    </Box>
  )
}

export default PlayerPro
