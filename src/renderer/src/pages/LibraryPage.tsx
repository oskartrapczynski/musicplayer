import { ContentSection } from '@renderer/components'
import { Library } from '@renderer/components'
import { ILibrary } from '@renderer/interfaces'

interface Props {
  library: ILibrary[] | null
}

const LibraryPage = ({ library }: Props) => {
  return (
    <ContentSection>
      <Library library={library} />
    </ContentSection>
  )
}

export default LibraryPage
