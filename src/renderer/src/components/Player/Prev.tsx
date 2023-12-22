import { IconButton } from '@mui/material'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'

interface Props {
  isDisabled: boolean
}

const Prev = ({ isDisabled }: Props) => {
  return (
    <IconButton disabled={isDisabled}>
      <SkipPreviousIcon />
    </IconButton>
  )
}

export default Prev
