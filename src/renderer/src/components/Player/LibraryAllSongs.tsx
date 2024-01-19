import { DATA_FILE } from '@global/constants'
import { ILibrary, IMusicResponse } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { InputSearch, LibraryContent } from '..'
import { Alert, Box, Button, CircularProgress, useTheme } from '@mui/material'
import {
  searchPathFromWords,
  setLibraryContentColor,
  setLibraryContentBoxShadow
} from '@renderer/utils'
import { IReadMusicPath, ISongPath } from '@renderer/interfaces'
import { useEffect, useState } from 'react'
import { LibraryAdd as LibraryAddIcon } from '@mui/icons-material'

interface Props {
  library: ILibrary[]
  setSelected: React.Dispatch<
    React.SetStateAction<{
      playlist: string
      path: string
    }>
  >
  handleLoad: ({ filePath, locationSong }: IReadMusicPath) => Promise<void>
  handleReadMusicDialog: (playlistId?: string) => Promise<void>
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
  setSelected,
  selected,
  handleLoad,
  handleReadMusicDialog,
  searchSong,
  setSearchSong,
  player
}: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<ISongPath[] | null>(null)
  const { palette } = useTheme()

  const loadSongs = async () => {
    const paths = library.map((path) => path)
    setFilteredLibrary(searchSong ? searchPathFromWords({ paths, searchSong }) : library)
  }

  const handleClickAddSongLibrary = async () => await handleReadMusicDialog()

  useEffect(() => {
    loadSongs()
  }, [searchSong, selected.playlist, library])

  return (
    <>
      {!filteredLibrary ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <LibraryContent alignItems={'flex-start'}>
          {library && library.length > 0 && (
            <InputSearch value={searchSong} setValue={setSearchSong} />
          )}
          {!searchSong && (
            <Button onClick={handleClickAddSongLibrary} startIcon={<LibraryAddIcon />}>
              Dodaj utwór
            </Button>
          )}

          {filteredLibrary && filteredLibrary.length > 0 ? (
            <>
              {(filteredLibrary as ILibrary[]).map(({ path }, index) => (
                <Button
                  key={index}
                  sx={{
                    boxShadow: setLibraryContentBoxShadow({ path, player, selected, palette })
                  }}
                  variant="contained"
                  fullWidth
                  color={setLibraryContentColor({ path, player, selected })}
                  onClick={() => setSelected({ playlist: DATA_FILE.LIBRARY, path })}
                  onDoubleClick={() =>
                    handleLoad({ filePath: path, locationSong: DATA_FILE.LIBRARY })
                  }
                >
                  {getFileName(path)}
                </Button>
              ))}
            </>
          ) : (
            <Alert severity="warning">Biblioteka jest pusta</Alert>
          )}
        </LibraryContent>
      )}
    </>
  )
}

export default LibraryAllSongs
