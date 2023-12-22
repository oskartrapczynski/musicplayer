import { useState } from 'react'
import { MusicResponse, READ_MUSIC_STATE } from '@global'
import { usePlayer } from '@renderer/hooks'
import { MenuApp, MenuControlBottom, SongInfo } from '@renderer/components'
import { openDialogMusicFile } from '@renderer/utils'
import { Alert, Box, Button } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import NodeID3 from 'node-id3'

interface Props {
  handleOpenMusicFile: () => Promise<void>
  tags?: NodeID3.Tags | undefined
  duration: number | null
}

const PlayerBasic = ({ handleOpenMusicFile, tags, duration }: Props) => {
  // const [src, setSrc] = useState<string | undefined>(undefined)
  // const [player, setPlayer] = useState<musicResponse>({
  //   song: undefined,
  //   tags: undefined,
  //   info: READ_MUSIC_STATE.NOT_LOADED,
  //   filePath: ''
  // })

  // const { isPlaying, toggle, duration, changeSongPos, songPos, currentTime } = usePlayer({
  //   audioObj,
  //   src: song as string
  // })

  // const handleOpenMusicFile = async () => {
  //   const data = await openDialogMusicFile()
  //   // setSrc(data.song)
  //   if (data?.info === READ_MUSIC_STATE.ERROR || data?.info === READ_MUSIC_STATE.CANCELLED) return
  //   setPlayer({ song: data?.song, tags: data?.tags, info: data?.info as READ_MUSIC_STATE })
  // }

  return (
    <>
      {/* <Box display="flex" width="100%" height="100vh">
        <MenuApp />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            width: '100%',
            height: '100vh'
          }}
        > */}
      <Box sx={{ width: '100%', height: 'auto', backgroundColor: 'blue', flexGrow: 1 }}>
        <Button onClick={handleOpenMusicFile} startIcon={<LibraryAddIcon />}>
          Dodaj utwór
        </Button>
        {tags ? (
          <SongInfo tags={tags} duration={duration} />
        ) : (
          <Alert severity="warning">Nie załadowano utworu</Alert>
        )}
      </Box>

      {/* <MenuControlBottom
        isPlaying={isPlaying}
        toggle={toggle}
        changeSongPos={changeSongPos}
        duration={duration}
        songPos={songPos}
        currentTime={currentTime}
        isDisabled={!player.song}
      /> 
      </Box>
      </Box> */}
    </>
  )
}

export default PlayerBasic
