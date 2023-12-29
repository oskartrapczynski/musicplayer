import NodeID3 from 'node-id3'
import { ContentSection, SongInfo } from '@renderer/components'
import { Alert, Button } from '@mui/material'
import { LibraryAdd as LibraryAddIcon } from '@mui/icons-material'

interface Props {
  handleReadMusicDialog: () => Promise<void>
  tags?: NodeID3.Tags | undefined
  duration: number | null
  filePath?: string
}

const PlayerBasicPage = ({ handleReadMusicDialog, tags, duration, filePath }: Props) => {
  return (
    <ContentSection>
      <Button onClick={handleReadMusicDialog} startIcon={<LibraryAddIcon />}>
        Dodaj utwór
      </Button>
      {tags ? (
        <SongInfo tags={tags} duration={duration} filePath={filePath} />
      ) : (
        <Alert severity="warning">Nie załadowano utworu</Alert>
      )}
    </ContentSection>
  )
}

export default PlayerBasicPage
