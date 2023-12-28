import { IconButton } from '@mui/material'
import { Pause as PauseIcon } from '@mui/icons-material'

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
