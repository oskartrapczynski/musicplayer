import { ILibrary, IPlaylist } from '@global/interfaces'
import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'

interface Props {
  library: ILibrary[]
  filePath?: string
  handleReadMusicPath: (path: string) => Promise<void>
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
}

const LibraryPage = ({
  library,
  filePath,
  handleReadMusicPath,
  playlists,
  setLibrary,
  setPlaylists
}: Props) => {
  return (
    <ContentSection>
      <Library
        library={library}
        filePath={filePath}
        handleReadMusicPath={handleReadMusicPath}
        playlists={playlists}
        setLibrary={setLibrary}
        setPlaylists={setPlaylists}
      />
    </ContentSection>
  )
}

export default LibraryPage
