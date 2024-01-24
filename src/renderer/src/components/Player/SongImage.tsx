import NodeID3 from 'node-id3'
import { createMusicCover } from '@renderer/utils'
import { Box } from '@mui/material'
import { MusicNote as MusicNoteIcon } from '@mui/icons-material'

interface Props {
  songTags: NodeID3.Tags | undefined
  width: string
  height: string
}

const SongImage = ({ songTags, width, height }: Props) => {
  const img = createMusicCover(songTags)
  return (
    <>
      {img ? (
        <img style={{ width, height }} src={img} alt="cover photo" />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width,
            height,
            background: 'linear-gradient(#000,#333)'
          }}
        >
          <MusicNoteIcon
            htmlColor="#fff"
            sx={{
              fontSize: `calc(${height} * 0.75)`
            }}
          />
        </Box>
      )}
    </>
  )
}

export default SongImage
