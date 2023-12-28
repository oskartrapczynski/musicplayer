import { IconButton } from '@mui/material'
import { Stop as StopIcon } from '@mui/icons-material'

interface Props {
  toggle: (play: boolean) => void
  changeSongPos: (seek: number) => void
  isDisabled: boolean
}

const Stop = ({ isDisabled, toggle, changeSongPos }: Props) => {
  const handleClick = () => {
    toggle(false)
    changeSongPos(0)
  }
  return (
    <IconButton disabled={isDisabled} onClick={handleClick}>
      <StopIcon />
    </IconButton>
  )
}

export default Stop
