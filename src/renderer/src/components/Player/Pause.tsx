import { IconButton } from '@mui/material'
import PauseIcon from '@mui/icons-material/Pause'

interface Props {
  toggle: () => void
  isDisabled: boolean
}

const Pause = ({ toggle, isDisabled }: Props) => {
  return (
    <IconButton onClick={() => toggle()} disabled={isDisabled}>
      <PauseIcon />
    </IconButton>
  )
}

export default Pause
