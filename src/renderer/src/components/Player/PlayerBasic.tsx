import { Alert, Box, Button } from '@mui/material'
import { usePlayer } from '@renderer/hooks'
import { useState } from 'react'
import { MenuControlBottom } from '..'
import { openDialogMusicFile } from '../../utils'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import SongInfo from './SongInfo'
import { musicResponse, READ_MUSIC_STATE } from '../../../../global'

const PlayerBasic = () => {
  // const [src, setSrc] = useState<string | undefined>(undefined)
  const [player, setPlayer] = useState<musicResponse>({
    song: undefined,
    tags: undefined,
    info: READ_MUSIC_STATE.NOT_LOADED,
    filePath: ''
  })
  const { isPlaying, toggle, duration, changeSongPos, songPos, currentTime } = usePlayer(
    player.song as string
  )

  console.log(duration)

  const handleOpenMusicFile = async () => {
    const data = await openDialogMusicFile()
    // setSrc(data.song)
    if (data?.info === READ_MUSIC_STATE.ERROR || data?.info === READ_MUSIC_STATE.CANCELLED) return
    setPlayer({ song: data?.song, tags: data?.tags, info: data?.info as READ_MUSIC_STATE })
  }

  return (
    <>
      <Box display="flex" width="100%" height="100vh">
        <Box sx={{ width: '75px', backgroundColor: 'red' }}>menu</Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            height: '100vh'
          }}
        >
          <Box sx={{ width: '100%', height: 'auto', backgroundColor: 'blue', flexGrow: 1 }}>
            <Button onClick={handleOpenMusicFile} startIcon={<LibraryMusicIcon />}>
              Dodaj utwór
            </Button>
            {player.tags ? (
              <SongInfo tags={player.tags} duration={duration} />
            ) : (
              <Alert severity="warning">Nie załadowano utworu</Alert>
            )}
          </Box>

          <MenuControlBottom
            isPlaying={isPlaying}
            toggle={toggle}
            changeSongPos={changeSongPos}
            duration={duration}
            songPos={songPos}
            currentTime={currentTime}
          />
        </Box>
      </Box>
    </>
  )
}

export default PlayerBasic
