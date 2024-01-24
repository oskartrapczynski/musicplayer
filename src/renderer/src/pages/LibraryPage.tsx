import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'
import { IReadMusicPath } from '@renderer/interfaces'

interface Props {
  library: ILibrary[]
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  handleReadMusicDialog: (playlistId?: string) => Promise<void>
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
}

const LibraryPage = ({
  library,
  handleReadMusicPath,
  handleReadMusicDialog,
  playlists,
  setLibrary,
  setPlaylists,
  player1
}: Props) => {
  return (
    <ContentSection>
      <Library
        library={library}
        handleReadMusicPath={handleReadMusicPath}
        handleReadMusicDialog={handleReadMusicDialog}
        playlists={playlists}
        setLibrary={setLibrary}
        setPlaylists={setPlaylists}
        player1={player1}
      />
    </ContentSection>
  )
}

export default LibraryPage
