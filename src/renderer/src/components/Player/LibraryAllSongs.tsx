import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, Button } from '@mui/material'

interface Props {
  library: ILibrary[]
  setVariant: (path: string) => 'text' | 'contained'
  setColor: (path: string) => 'success' | 'warning' | 'primary'
  handleSelect: (data: { playlist: string; path: string }) => void
  handleLoad: (path: string) => Promise<void>
}

const LibraryAllSongs = ({ library, setVariant, setColor, handleSelect, handleLoad }: Props) => {
  return (
    <>
      {library && library.length > 0 ? (
        library.map(({ path }, index) => (
          <Button
            key={index}
            variant={setVariant(path)}
            color={setColor(path)}
            onClick={() => handleSelect({ playlist: DATA_FILE.LIBRARY, path: path })}
            onDoubleClick={() => handleLoad(path)}
          >
            {getFileName(path)}
          </Button>
        ))
      ) : (
        <Alert severity="warning">Biblioteka jest pusta</Alert>
      )}
    </>
  )
}

export default LibraryAllSongs
