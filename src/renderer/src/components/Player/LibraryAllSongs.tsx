import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { InputSearch, BackgroundIcon } from '..'
import { Alert, alpha, Button } from '@mui/material'
import { Apps as AppsIcon } from '@mui/icons-material'
import { searchPathFromWords } from '@renderer/utils'

interface Props {
  library: ILibrary[]
  setColor: (path: string) => 'success' | 'warning' | 'primary'
  setBoxShadow: (path: string) => string | null
  handleSelect: (data: { playlist: string; path: string }) => void
  handleLoad: (path: string) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
}

const LibraryAllSongs = ({
  library,
  setColor,
  setBoxShadow,
  handleSelect,
  handleLoad,
  searchSong,
  setSearchSong
}: Props) => {
  const filteredLibrary = searchSong ? searchPathFromWords(library, searchSong, 'library') : library

  return (
    <BackgroundIcon Icon={AppsIcon} iconColor={alpha('#000', 0.1)} alignItems={'flex-start'}>
      <InputSearch value={searchSong} setValue={setSearchSong} />
      {filteredLibrary && filteredLibrary.length > 0 ? (
        (filteredLibrary as ILibrary[]).map(({ path }, index) => (
          <Button
            key={index}
            sx={{ boxShadow: setBoxShadow(path) }}
            variant="contained"
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
    </BackgroundIcon>
  )
}

export default LibraryAllSongs
