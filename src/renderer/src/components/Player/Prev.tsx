import { IconButton } from '@mui/material'
import { SkipPrevious as SkipPreviousIcon } from '@mui/icons-material'

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
