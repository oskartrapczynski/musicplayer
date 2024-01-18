import { useState } from 'react'
import { TextField, IconButton, useTheme, Box } from '@mui/material'
import { AddCircle as AddCircleIcon } from '@mui/icons-material'
import { LibraryContent } from '..'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  library: ILibrary[]
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
}

const AddPlaylist = ({ setPlaylists }: Props) => {
  const [input, setInput] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setInput(e.target.value)

  const { palette } = useTheme()

  const handleAdd = () => {
    if (!input) return
    setPlaylists((prev) => [...prev, { playlistId: uuidv4(), name: input, songs: [] }])
  }

  return (
    <LibraryContent>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField
          placeholder="Dodaj nową"
          variant="standard"
          value={input}
          onChange={handleChange}
          color="success"
          sx={{ input: { color: palette.success.main } }}
        />
        <IconButton onClick={handleAdd}>
          <AddCircleIcon sx={{ fontSize: '50px' }} color="success" />
        </IconButton>
      </Box>
    </LibraryContent>
  )
}

export default AddPlaylist
