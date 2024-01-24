import NodeID3 from 'node-id3'
import { getFileName } from '@global/utils'
import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ROUTE } from '@renderer/constants'
import { LibraryMusic as LibraryMusicIcon } from '@mui/icons-material'
import { SongImage } from '..'
import { secondsToMusicTime } from '@renderer/utils'

interface Props {
  songTags?: NodeID3.Tags
  duration: null | number
  filePath?: string
}

const PlayerBasic = ({ songTags, duration, filePath }: Props) => {
  return (
    <Box sx={{ display: 'flex', p: 5, width: '100%', height: '100%', backgroundColor: 'yellow' }}>
      {!filePath ? (
        <Stack gap={1} sx={{ width: '100%' }}>
          <Alert severity="warning" sx={{ width: '100%', maxHeight: '50px' }}>
            Nie załadowano utworu
          </Alert>
          <Typography>{'Aby załadować utwór przejdź do zakładki "Biblioteka"'}</Typography>
          <Link to={`/${ROUTE.LIBRARY}`}>
            <Button startIcon={<LibraryMusicIcon />} variant="contained">
              Biblioteka
            </Button>
          </Link>
        </Stack>
      ) : (
        <>
          <SongImage height="200px" width="200px" songTags={songTags} />
          <Box sx={{ pl: 2, flexGrow: 1 }}>
            <Typography variant="h6">{`Nazwa: ${
              filePath ? getFileName(filePath) : '-'
            }`}</Typography>
            <Typography variant="h6">{`Tytuł: ${
              songTags?.title ? songTags?.title : '-'
            }`}</Typography>
            <Typography variant="h6">{`Autor: ${
              songTags?.artist ? songTags?.artist : '-'
            }`}</Typography>
            <Typography variant="h6">{`Gatunek: ${
              songTags?.genre ? songTags?.genre : '-'
            }`}</Typography>
            <Typography variant="h6">{`Długość: ${
              duration ? secondsToMusicTime(duration) : '-'
            }`}</Typography>
          </Box>
        </>
      )}
    </Box>
  )
}

export default PlayerBasic
