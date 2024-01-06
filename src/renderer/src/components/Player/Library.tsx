import { useState } from 'react'
import { getFileName } from '@global/utils'
import { ILibrary } from '@global/interfaces'
import { Alert, Box, Button, Stack } from '@mui/material'
import { Apps as AppsIcon, List as ListIcon } from '@mui/icons-material'
import { enqueueSnackbar } from 'notistack'

interface Props {
  library: ILibrary[] | null
  filePath?: string
  handleReadMusicPath: (path: string) => Promise<void>
}

// filePath is current playing song
const Library = ({ library, filePath, handleReadMusicPath }: Props) => {
  const [selected, setSelected] = useState('')

  const handleLoad = async (path: string) => {
    if (!path) return enqueueSnackbar('Wybierz utwór aby załadować', { variant: 'warning' })
    return await handleReadMusicPath(path)
  }

  const handleSelect = (path: string) => setSelected(path)

  const setVariant = (path: string) => {
    if (path !== filePath) return 'text'
    return 'contained'
  }

  const setColor = (path: string) => {
    if (path === selected) return 'warning'
    if (path === filePath) return 'success'
    return 'primary'
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          backgroundColor: 'gray'
        }}
      >
        <Box
          sx={{
            width: '30%',
            height: '100%',
            overflow: 'scroll',
            p: 2,
            backgroundColor: '#666',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          <Stack gap={2}>
            <Button variant="contained" startIcon={<AppsIcon />}>
              Wszystkie
            </Button>
            {/* add implementation of playlists.json */}
            <Button variant="contained" startIcon={<ListIcon />}>
              Playlista2
            </Button>
            <Button variant="contained" startIcon={<ListIcon />}>
              Playlista3
            </Button>
            <Button variant="contained" startIcon={<ListIcon />}>
              Playlista4
            </Button>
          </Stack>
        </Box>

        <Box sx={{ width: '70%', backgroundColor: '#333' }}>
          {library && library.length > 0 ? (
            library.map(({ path }, index) => (
              <Button
                key={index}
                variant={setVariant(path)}
                color={setColor(path)}
                onClick={() => handleSelect(path)}
                onDoubleClick={() => handleLoad(path)}
              >
                {getFileName(path)}
                {/* {path} */}
              </Button>
            ))
          ) : (
            <Alert severity="warning">Biblioteka jest pusta</Alert>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Library
