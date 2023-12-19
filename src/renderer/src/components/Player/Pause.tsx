import { IconButton } from '@mui/material'
import PauseIcon from '@mui/icons-material/Pause'

interface Props {
  toggle: () => void
}

const Pause = ({ toggle }: Props) => {
  return (
    <IconButton onClick={() => toggle()}>
      <PauseIcon />
    </IconButton>
  )
}

export default Pause
