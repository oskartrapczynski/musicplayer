import { IconButton } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { SnackbarKey, useSnackbar } from 'notistack'

interface Props {
  snackbarKey: SnackbarKey
}

const SnackbarCloseButton = ({ snackbarKey }: Props) => {
  const { closeSnackbar } = useSnackbar()
  const handleClick = () => closeSnackbar(snackbarKey)
  return (
    <IconButton onClick={handleClick}>
      <CloseIcon htmlColor="#fff" />
    </IconButton>
  )
}

export default SnackbarCloseButton
