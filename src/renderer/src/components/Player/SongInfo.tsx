import NodeID3 from 'node-id3'
import { getFileName } from '@global/utils'
import { convertBufferToImage, secondsToMusicTime } from '@renderer/utils'
import { INodeID3Image } from '@renderer/interfaces'
import { Box, Typography } from '@mui/material'
import { MusicNote as MusicNoteIcon } from '@mui/icons-material'

interface Props {
  tags?: NodeID3.Tags
  duration: null | number
  filePath?: string
}

const SongInfo = ({ tags, duration, filePath }: Props) => {
  const img =
    tags &&
    (tags.image as INodeID3Image) &&
    (tags.image as INodeID3Image).imageBuffer &&
    (tags.image as INodeID3Image).mime
      ? convertBufferToImage(
          (tags.image as INodeID3Image).imageBuffer,
          (tags.image as INodeID3Image).mime
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
        <Typography variant="h5">{`Nazwa: ${filePath ? getFileName(filePath) : '-'}`}</Typography>
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
