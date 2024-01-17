import { IconButton } from '@mui/material'
import { SkipNext as SkipNextIcon } from '@mui/icons-material'
import { getCurrentPlayingId, nextSongLibrary, nextSongPlaylist } from '@renderer/utils'
import { DATA_FILE } from '@global/constants'
import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { IReadMusicPath } from '@renderer/interfaces'

interface Props {
  isDisabled: boolean
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
}

const Next = ({ isDisabled, library, playlists, player, handleReadMusicPath }: Props) => {
  const handleClick = async () => {
    if (isDisabled || !player.locationSong || !library || library.length === 0) return
    const currentPlayingId = await getCurrentPlayingId({ library, playlists, player })
    if (currentPlayingId === -1) return

    player.locationSong === DATA_FILE.LIBRARY
      ? await nextSongLibrary({
          library,
          currentPlayingId,
          handleReadMusicPath
        })
      : await nextSongPlaylist({
          playlists,
          player,
          currentPlayingId,
          library,
          handleReadMusicPath
        })
  }

  return (
    <IconButton disabled={isDisabled} onClick={handleClick}>
      <SkipNextIcon />
    </IconButton>
  )
}

export default Next
