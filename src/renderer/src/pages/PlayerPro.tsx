import { IMusicResponse } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Box, Button, Slider, Typography } from '@mui/material'
import { ContentSection, SongImage } from '@renderer/components'

interface Propsssssssss {
  player: IMusicResponse & {
    locationSong: string | undefined
  }
}

const PlayerPro = ({ player: { filePath, songTags } }: Propsssssssss) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100%'
      }}
    >
      <Box width="100%">
        <SongImage height="50px" width="50px" songTags={songTags} />
        <Typography>{`Nazwa: ${filePath ? getFileName(filePath) : '-'}`}</Typography>
        <Typography>{`Tytuł: ${songTags?.title ? songTags?.title : '-'}`}</Typography>
        <Typography>{`Autor: ${songTags?.artist ? songTags?.artist : '-'}`}</Typography>
      </Box>
      <Box width="100%">
        <Button variant="outlined" color="warning">
          IN
        </Button>
        <Button variant="outlined" color="warning">
          OUT
        </Button>
        <Button variant="outlined" color="warning">
          X
        </Button>
      </Box>
      <Box width="100%">
        <Button variant="outlined">A</Button>
        <Button variant="outlined">B</Button>
        <Button variant="outlined">C</Button>
        <Button variant="outlined">D</Button>
      </Box>
      <Box>
        <Slider orientation="vertical" sx={{ height: '100px' }} />
      </Box>
    </Box>
  )
}

interface Props {
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  // player2: IMusicResponse & {
  //   locationSong: string | undefined
  // }
}

const PlayerProPage = ({ player1 }: Props) => {
  return (
    <ContentSection>
      <PlayerPro player={player1} />
      <PlayerPro player={player1} />
    </ContentSection>
  )
}

export default PlayerProPage
