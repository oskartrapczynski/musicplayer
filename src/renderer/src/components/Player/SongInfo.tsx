import { Box, Typography } from '@mui/material'
import { convertBuffetToImage, secondsToMusicTime } from '@renderer/utils'
import NodeID3 from 'node-id3'

interface Props {
  tags?: NodeID3.Tags
  duration: null | number
}

const SongInfo = ({ tags, duration }: Props) => {
  const img =
    tags && tags.image ? convertBuffetToImage(tags.image.imageBuffer, tags.image.mime) : null
  return (
    <Box sx={{ display: 'flex', p: 5, width: '100%', height: '100%', backgroundColor: 'yellow' }}>
      {img ? (
        <img style={{ width: 200, height: 200 }} src={img} alt="cover photo" />
      ) : (
        <Box sx={{ width: 200, height: 200, backgroundColor: '#000' }} />
      )}
      <Box sx={{ pl: 2 }}>
        <Typography variant="h5">{`Tytuł: ${tags!.title ? tags!.title : '-'}`}</Typography>
        <Typography variant="h5">{`Autor: ${tags!.artist ? tags!.artist : '-'}`}</Typography>
        <Typography variant="h5">{`Gatunek: ${tags!.genre ? tags!.genre : '-'}`}</Typography>
        <Typography variant="h5">{`Długość: ${
          duration ? secondsToMusicTime(duration) : '-'
        }`}</Typography>
      </Box>
    </Box>
  )
}

export default SongInfo
