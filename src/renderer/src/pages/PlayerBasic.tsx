import NodeID3 from 'node-id3'
import { ContentSection, PlayerBasic } from '@renderer/components'

interface Props {
  songTags?: NodeID3.Tags | undefined
  duration: number | null
  filePath?: string
}

const PlayerBasicPage = ({ songTags, duration, filePath }: Props) => {
  return (
    <ContentSection>
      <PlayerBasic songTags={songTags} duration={duration} filePath={filePath} />
    </ContentSection>
  )
}

export default PlayerBasicPage
