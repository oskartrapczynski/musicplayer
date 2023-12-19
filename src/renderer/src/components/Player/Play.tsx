import { IconButton } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

interface Props {
  toggle: () => void
}

const Play = ({ toggle }: Props) => {
  return (
    <IconButton onClick={() => toggle()}>
      <PlayArrowIcon />
    </IconButton>
  )
}

export default Play
