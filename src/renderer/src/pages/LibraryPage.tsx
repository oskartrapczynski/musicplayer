import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'
import { IReadMusicPath } from '@renderer/interfaces'

interface Props {
  library: ILibrary[]
  handleReadMusicPath: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
  player: IMusicResponse & {
    locationSong: string | undefined
  }
}

const LibraryPage = ({
  library,
  handleReadMusicPath,
  playlists,
  setLibrary,
  setPlaylists,
  player
}: Props) => {
  return (
    <ContentSection>
      <Library
        library={library}
        handleReadMusicPath={handleReadMusicPath}
        playlists={playlists}
        setLibrary={setLibrary}
        setPlaylists={setPlaylists}
        player={player}
      />
    </ContentSection>
  )
}

export default LibraryPage
