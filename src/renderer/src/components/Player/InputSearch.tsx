import { Box, TextField, IconButton } from '@mui/material'
import { Cancel as CancelIcon } from '@mui/icons-material'

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const InputSearch = ({ value, setValue }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <TextField variant="standard" placeholder="Szukaj" value={value} onChange={handleChange} />
      <IconButton onClick={() => setValue('')}>
        <CancelIcon />
      </IconButton>
    </Box>
  )
}

export default InputSearch
