import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, Button } from '@mui/material'
import InputSearch from './InputSearch'

interface Props {
  library: ILibrary[]
  setVariant: (path: string) => 'text' | 'contained'
  setColor: (path: string) => 'success' | 'warning' | 'primary'
  handleSelect: (data: { playlist: string; path: string }) => void
  handleLoad: (path: string) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
}

const LibraryAllSongs = ({
  library,
  setVariant,
  setColor,
  handleSelect,
  handleLoad,
  searchSong,
  setSearchSong
}: Props) => {
  const filteredLibrary = searchSong
    ? library.filter(({ path }) =>
        getFileName(path).toLowerCase().includes(searchSong.toLowerCase())
      )
    : library
  return (
    <>
      <InputSearch value={searchSong} setValue={setSearchSong} />
      {filteredLibrary && filteredLibrary.length > 0 ? (
        filteredLibrary.map(({ path }, index) => (
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
