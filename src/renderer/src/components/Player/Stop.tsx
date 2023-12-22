import { IconButton } from '@mui/material'
import StopIcon from '@mui/icons-material/Stop'

interface Props {
  isDisabled: boolean
}

const Stop = ({ isDisabled }: Props) => {
  return (
    <IconButton disabled={isDisabled}>
      <StopIcon />
    </IconButton>
  )
}

export default Stop
