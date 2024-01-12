import { ILibrary, IPlaylist } from '@global/interfaces'
import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'

interface Props {
  library: ILibrary[]
  filePath?: string
  handleReadMusicPath: (path: string) => Promise<void>
  playlists: IPlaylist[]
}

const LibraryPage = ({ library, filePath, handleReadMusicPath, playlists }: Props) => {
  return (
    <ContentSection>
      <Library
        library={library}
        filePath={filePath}
        handleReadMusicPath={handleReadMusicPath}
        playlists={playlists}
      />
    </ContentSection>
  )
}

export default LibraryPage
