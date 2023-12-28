import { IconButton } from '@mui/material'
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material'

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
