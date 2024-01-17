import { IconButton } from '@mui/material'
import { SkipPrevious as SkipPreviousIcon } from '@mui/icons-material'
import { ILibrary, IPlaylist, IMusicResponse } from '@global/interfaces'
import { IReadMusicPath } from '@renderer/interfaces'
import { DATA_FILE } from '@global/constants'
import { getCurrentPlayingId, prevSongLibrary, prevSongPlaylist } from '@renderer/utils'

interface Props {
  isDisabled: boolean
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
}

const Prev = ({ isDisabled, library, playlists, player, handleReadMusicPath }: Props) => {
  const handleClick = async () => {
    if (isDisabled || !player.locationSong || !library || library.length === 0) return
    const currentPlayingId = await getCurrentPlayingId({ library, playlists, player })
    if (currentPlayingId === -1) return

    player.locationSong === DATA_FILE.LIBRARY
      ? await prevSongLibrary({
          library,
          currentPlayingId,
          handleReadMusicPath
        })
      : await prevSongPlaylist({
          playlists,
          player,
          currentPlayingId,
          library,
          handleReadMusicPath
        })
  }
  return (
    <IconButton disabled={isDisabled} onClick={handleClick}>
      <SkipPreviousIcon />
    </IconButton>
  )
}

export default Prev
