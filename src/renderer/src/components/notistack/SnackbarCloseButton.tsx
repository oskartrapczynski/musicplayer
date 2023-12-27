import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { SnackbarKey, useSnackbar } from 'notistack'

interface Props {
  snackbarKey: SnackbarKey
}

const SnackbarCloseButton = ({ snackbarKey }: Props) => {
  const { closeSnackbar } = useSnackbar()

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon htmlColor="#fff" />
    </IconButton>
  )
}

export default SnackbarCloseButton
