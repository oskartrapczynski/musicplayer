import { IconButton } from '@mui/material'
import PauseIcon from '@mui/icons-material/Pause'

interface Props {
  toggle: (play: boolean) => void
  isDisabled: boolean
}

const Pause = ({ toggle, isDisabled }: Props) => {
  return (
    <IconButton onClick={() => toggle(false)} disabled={isDisabled}>
      <PauseIcon />
    </IconButton>
  )
}

export default Pause
