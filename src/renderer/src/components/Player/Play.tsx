import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface Props {
  toggle: () => void
  isDisabled: boolean
}

const Play = ({ toggle, isDisabled }: Props) => {
  return (
    <IconButton onClick={() => toggle()} disabled={isDisabled}>
      <PlayArrowIcon />
    </IconButton>
  )
}

export default Play
