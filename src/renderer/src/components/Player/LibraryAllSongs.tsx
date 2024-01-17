import { DATA_FILE } from '@global/constants'
import { ILibrary, IMusicResponse } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { InputSearch, LibraryContent } from '..'
import { Alert, Button } from '@mui/material'
import {
  searchPathFromWords,
  setLibraryContentColor,
  setLibraryContentBoxShadow
} from '@renderer/utils'
import { IReadMusicPath } from '@renderer/interfaces'

interface Props {
  library: ILibrary[]
  handleSelect: (data: { playlist: string; path: string }) => void
  handleLoad: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
  player: IMusicResponse & {
    locationSong: string | undefined
  }
  selected: {
    playlist: string
    path: string
  }
}

const LibraryAllSongs = ({
  library,
  handleSelect,
  handleLoad,
  searchSong,
  setSearchSong,
  player,
  selected
}: Props) => {
  const paths = library.map((path) => path)
  const filteredLibrary = searchSong ? searchPathFromWords({ paths, searchSong }) : library

  return (
    <LibraryContent alignItems={'flex-start'}>
      <InputSearch value={searchSong} setValue={setSearchSong} />
      {filteredLibrary && filteredLibrary.length > 0 ? (
        (filteredLibrary as ILibrary[]).map(({ path }, index) => (
          <Button
            key={index}
            sx={{ boxShadow: setLibraryContentBoxShadow({ path, player, selected }) }}
            variant="contained"
            color={setLibraryContentColor({ path, player, selected })}
            onClick={() => handleSelect({ playlist: DATA_FILE.LIBRARY, path })}
            onDoubleClick={() => handleLoad({ filePath: path, locationSong: DATA_FILE.LIBRARY })}
          >
            {getFileName(path)}
          </Button>
        ))
      ) : (
        <Alert severity="warning">Biblioteka jest pusta</Alert>
      )}
    </LibraryContent>
  )
}

export default LibraryAllSongs
