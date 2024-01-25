import { IconButton } from '@mui/material'
import { SkipPrevious as SkipPreviousIcon } from '@mui/icons-material'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { IReadMusicPath, Player } from '@renderer/interfaces'
import { DATA_FILE } from '@global/constants'
import { getCurrentPlayingId, prevSongLibrary, prevSongPlaylist } from '@renderer/utils'
import { PLAYER } from '@renderer/constants'

interface Props {
  isDisabled: boolean
  library: ILibrary[] | null
  playlists: IPlaylist[] | null
  player: Player
  playerId: PLAYER
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
}

const Prev = ({ isDisabled, library, playlists, player, handleReadMusicPath, playerId }: Props) => {
  const handleClick = async () => {
    if (isDisabled || !player.locationSong || !library || library.length === 0) return
    const currentPlayingId = await getCurrentPlayingId({ library, playlists, player })
    if (currentPlayingId === -1) return

    player.locationSong === DATA_FILE.LIBRARY
      ? await prevSongLibrary({
          library,
          currentPlayingId,
          handleReadMusicPath,
          playerId
        })
      : await prevSongPlaylist({
          playlists,
          player,
          currentPlayingId,
          library,
          handleReadMusicPath,
          playerId
        })
  }
  return (
    <IconButton disabled={isDisabled} onClick={handleClick}>
      <SkipPreviousIcon />
    </IconButton>
  )
}

export default Prev
