import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { InputSearch, LibraryAllSongs, LibraryPlaylistSongs } from '..'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { DATA_FILE } from '@global/constants'
import { Box, Button, Stack } from '@mui/material'
import { Apps as AppsIcon, List as ListIcon } from '@mui/icons-material'

interface Props {
  library: ILibrary[]
  filePath?: string
  handleReadMusicPath: (path: string) => Promise<void>
  playlists: IPlaylist[]
}

// filePath is current playing song
const Library = ({ library, filePath, handleReadMusicPath, playlists }: Props) => {
  const [selected, setSelected] = useState({ playlist: `${DATA_FILE.LIBRARY}`, path: '' })

  const [searchPlaylist, setSearchPlaylist] = useState('')
  const [searchSong, setSearchSong] = useState('')

  const handleLoad = async (path: string) => {
    if (!path) {
      enqueueSnackbar('Wybierz utwór aby załadować', { variant: 'warning' })
      return
    }
    return await handleReadMusicPath(path)
  }

  const handleSelect = (data: { playlist: string; path: string }) => setSelected(data)

  const setVariant = (path: string) => {
    if (path !== filePath) return 'text'
    return 'contained'
  }

  const setColor = (path: string) => {
    if (path === selected.path) return 'warning'
    if (path === filePath) return 'success'
    return 'primary'
  }

  console.log(searchPlaylist)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          backgroundColor: 'gray'
        }}
      >
        <Box
          sx={{
            width: '30%',
            height: '100%',
            overflow: 'scroll',
            p: 2,
            backgroundColor: '#666',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          <Stack gap={2}>
            <InputSearch value={searchPlaylist} setValue={setSearchPlaylist} />
            {searchPlaylist ? (
              <>
                {playlists
                  .filter(({ name }) => name.toLowerCase().includes(searchPlaylist.toLowerCase()))
                  .map(({ playlistId, name }, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      startIcon={<ListIcon />}
                      onClick={() => {
                        handleSelect({ playlist: playlistId, path: '' })
                        setSearchPlaylist('')
                      }}
                    >
                      {name}
                    </Button>
                  ))}
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  startIcon={<AppsIcon />}
                  onClick={() => handleSelect({ playlist: DATA_FILE.LIBRARY, path: '' })}
                >
                  Wszystkie
                </Button>
                {playlists?.length > 0 &&
                  playlists.map(({ playlistId, name }, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      startIcon={<ListIcon />}
                      onClick={() => {
                        handleSelect({ playlist: playlistId, path: '' })
                      }}
                    >
                      {name}
                    </Button>
                  ))}
              </>
            )}
          </Stack>
        </Box>

        <Box
          sx={{
            width: '70%',
            backgroundColor: '#333',
            overflow: 'scroll',
            '&::-webkit-scrollbar': { display: 'none' }
          }}
        >
          {selected.playlist === DATA_FILE.LIBRARY && (
            <LibraryAllSongs
              library={library}
              setVariant={setVariant}
              setColor={setColor}
              handleSelect={handleSelect}
              handleLoad={handleLoad}
              searchSong={searchSong}
              setSearchSong={setSearchSong}
            />
          )}

          {selected.playlist !== DATA_FILE.LIBRARY && (
            <LibraryPlaylistSongs
              selectedPlaylist={selected.playlist}
              playlists={playlists}
              library={library}
              setVariant={setVariant}
              setColor={setColor}
              handleSelect={handleSelect}
              handleLoad={handleLoad}
              searchSong={searchSong}
              setSearchSong={setSearchSong}
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default Library
