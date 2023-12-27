import { ContentSection, SongInfo } from '@renderer/components'
import { Alert, Button } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import NodeID3 from 'node-id3'

interface Props {
  handleOpenMusicFile: () => Promise<void>
  tags?: NodeID3.Tags | undefined
  duration: number | null
}

const PlayerBasicPage = ({ handleOpenMusicFile, tags, duration }: Props) => {
  return (
    <ContentSection>
      <Button onClick={handleOpenMusicFile} startIcon={<LibraryAddIcon />}>
        Dodaj utwór
      </Button>
      {tags ? (
        <SongInfo tags={tags} duration={duration} />
      ) : (
        <Alert severity="warning">Nie załadowano utworu</Alert>
      )}
    </ContentSection>
  )
}

export default PlayerBasicPage
