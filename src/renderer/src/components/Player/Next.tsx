import { IconButton } from '@mui/material'
import SkipNextIcon from '@mui/icons-material/SkipNext'

interface Props {
  isDisabled: boolean
}

const Next = ({ isDisabled }: Props) => {
  return (
    <IconButton disabled={isDisabled}>
      <SkipNextIcon />
    </IconButton>
  )
}

export default Next
