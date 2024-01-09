import NodeID3 from 'node-id3'
import { getFileName } from '@global/utils'
import { convertBufferToImage, secondsToMusicTime } from '@renderer/utils'
import { INodeID3Image } from '@renderer/interfaces'
import { Box, Chip, Typography } from '@mui/material'
import { MusicNote as MusicNoteIcon } from '@mui/icons-material'

interface Props {
  songTags?: NodeID3.Tags
  duration: null | number
  filePath?: string
  userTags?: string[]
}

const SongInfo = ({ songTags, duration, filePath, userTags }: Props) => {
  console.log(userTags)
  const img =
    songTags &&
    (songTags.image as INodeID3Image) &&
    (songTags.image as INodeID3Image).imageBuffer &&
    (songTags.image as INodeID3Image).mime
      ? convertBufferToImage(
          (songTags.image as INodeID3Image).imageBuffer,
          (songTags.image as INodeID3Image).mime
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
        <Typography variant="h6">{`Nazwa: ${filePath ? getFileName(filePath) : '-'}`}</Typography>
        <Typography variant="h6">{`Tytuł: ${songTags!.title ? songTags!.title : '-'}`}</Typography>
        <Typography variant="h6">{`Autor: ${
          songTags!.artist ? songTags!.artist : '-'
        }`}</Typography>
        <Typography variant="h6">{`Gatunek: ${
          songTags!.genre ? songTags!.genre : '-'
        }`}</Typography>
        <Typography variant="h6">{`Długość: ${
          duration ? secondsToMusicTime(duration) : '-'
        }`}</Typography>
        <Box display="flex">
          <Typography variant="h6">{'Tagi:'}</Typography>
          {userTags && userTags.length > 0 ? (
            userTags.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" sx={{ ml: '5px' }} />
            ))
          ) : (
            <Typography variant="h6" sx={{ ml: '5px' }}>
              {'-'}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default SongInfo
