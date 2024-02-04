import { ILibrary, IPlaylist } from '@global/interfaces'
import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'
import { APP_MODE, PLAYER } from '@renderer/constants'
import { IReadMusicPath, Player } from '@renderer/interfaces'
import { SnackbarKey } from 'notistack'

interface Props {
  appMode: APP_MODE
  library: ILibrary[]
  handleReadMusicPath: ({
    filePath,
    locationSong,
    playerId
  }: IReadMusicPath & {
    playerId: PLAYER
  }) => Promise<void>
  handleReadMusicDialog: (playlistId?: string) => Promise<SnackbarKey>
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  player1: Player
  player2: Player
}

const LibraryPage = ({
  appMode,
  library,
  handleReadMusicPath,
  handleReadMusicDialog,
  playlists,
  setLibrary,
  setPlaylists,
  player1,
  player2
}: Props) => {
  return (
    <ContentSection>
      <Library
        appMode={appMode}
        library={library}
        handleReadMusicPath={handleReadMusicPath}
        handleReadMusicDialog={handleReadMusicDialog}
        playlists={playlists}
        setLibrary={setLibrary}
        setPlaylists={setPlaylists}
        player1={player1}
        player2={player2}
      />
    </ContentSection>
  )
}

export default LibraryPage
