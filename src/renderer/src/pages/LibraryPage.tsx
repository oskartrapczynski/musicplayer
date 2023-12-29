import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'
import { ILibrary } from '@renderer/interfaces'

interface Props {
  library: ILibrary[] | null
  filePath?: string
  handleReadMusicPath: (path: string) => Promise<void>
}

const LibraryPage = ({ library, filePath, handleReadMusicPath }: Props) => {
  return (
    <ContentSection>
      <Library library={library} filePath={filePath} handleReadMusicPath={handleReadMusicPath} />
    </ContentSection>
  )
}

export default LibraryPage
