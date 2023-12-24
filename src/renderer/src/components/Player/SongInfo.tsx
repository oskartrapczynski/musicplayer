import { Box, Typography } from '@mui/material'
import { NodeID3Image } from '@renderer/interfaces'
import { convertBuffetToImage, secondsToMusicTime } from '@renderer/utils'
import NodeID3 from 'node-id3'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

interface Props {
  tags?: NodeID3.Tags
  duration: null | number
}

const SongInfo = ({ tags, duration }: Props) => {
  const img =
    tags &&
    (tags.image as NodeID3Image) &&
    (tags.image as NodeID3Image).imageBuffer &&
    (tags.image as NodeID3Image).mime
      ? convertBuffetToImage(
          (tags.image as NodeID3Image).imageBuffer,
          (tags.image as NodeID3Image).mime
        )
      : null
  return (
    <Box sx={{ display: 'flex', p: 5, width: '100%', height: '100%', backgroundColor: 'yellow' }}>
      {img ? (
        <img style={{ width: 200, height: 200 }} src={img} alt="cover photo" />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
            background: 'linear-gradient(#000,#333)'
          }}
        >
          <MusicNoteIcon
            htmlColor="#fff"
            sx={{
              fontSize: '150px'
            }}
          />
        </Box>
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
