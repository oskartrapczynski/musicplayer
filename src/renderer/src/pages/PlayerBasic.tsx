import NodeID3 from 'node-id3'
import { ContentSection, SongInfo } from '@renderer/components'

interface Props {
  songTags?: NodeID3.Tags | undefined
  duration: number | null
  filePath?: string
  userTags?: string[]
}

const PlayerBasicPage = ({ songTags, duration, filePath, userTags }: Props) => {
  return (
    <ContentSection>
      <SongInfo songTags={songTags} duration={duration} filePath={filePath} userTags={userTags} />
    </ContentSection>
  )
}

export default PlayerBasicPage
