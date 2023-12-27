import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface Props {
  toggle: (play: boolean) => void
  isDisabled: boolean
}

const Play = ({ toggle, isDisabled }: Props) => {
  return (
    <IconButton onClick={() => toggle(true)} disabled={isDisabled}>
      <PlayArrowIcon />
    </IconButton>
  )
}

export default Play
