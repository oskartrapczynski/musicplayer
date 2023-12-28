import { IconButton } from '@mui/material'
import { SkipNext as SkipNextIcon } from '@mui/icons-material'

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
