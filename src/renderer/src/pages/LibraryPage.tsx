import { ILibrary } from '@global/interfaces'
import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'

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
