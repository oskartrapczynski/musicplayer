import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { AddPlaylist, InputSearch, LibraryAllSongs, LibraryPlaylistSongs } from '..'
import { ILibrary, IPlaylist } from '@global/interfaces'
import { DATA_FILE } from '@global/constants'
import { Box, Button, Stack, useTheme } from '@mui/material'
import { Apps as AppsIcon, List as ListIcon, Add as AddIcon } from '@mui/icons-material'
interface Props {
  library: ILibrary[]
  filePath?: string
  handleReadMusicPath: (path: string) => Promise<void>
  playlists: IPlaylist[]
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[]>>
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[]>>
}

// filePath is current playing song
const Library = ({
  library,
  filePath,
  handleReadMusicPath,
  playlists,
  setLibrary,
  setPlaylists
}: Props) => {
  const [selected, setSelected] = useState({ playlist: `${DATA_FILE.LIBRARY}`, path: '' })

  const { palette } = useTheme()

  const ADD_PLAYLIST = 'add'

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

  const setBoxShadow = (path: string) => {
    if (path === filePath) return `${palette.success.main} 0px 0px 25px 0px`
    return null
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
          <Stack gap={1}>
            <InputSearch value={searchPlaylist} setValue={setSearchPlaylist} />
            <Button
              sx={{ justifyContent: 'flex-start' }}
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => setSelected({ playlist: ADD_PLAYLIST, path: '' })}
            >
              Dodaj
            </Button>
            {searchPlaylist ? (
              <>
                {playlists
                  .filter(({ name }) => {
                    const searchWords = searchPlaylist.split(' ').map((word) => word.toLowerCase())
                    const matchWords = searchWords.map((word) => name.toLowerCase().includes(word))
                    return matchWords.filter((item) => item).length === searchWords.length
                  })
                  .map(({ playlistId, name }, index) => (
                    <Button
                      key={index}
                      sx={{ justifyContent: 'flex-start' }}
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
                  sx={{ justifyContent: 'flex-start' }}
                  startIcon={<AppsIcon />}
                  onClick={() => handleSelect({ playlist: DATA_FILE.LIBRARY, path: '' })}
                >
                  Wszystkie
                </Button>
                {playlists?.length > 0 &&
                  playlists.map(({ playlistId, name }, index) => (
                    <Button
                      key={index}
                      sx={{ justifyContent: 'flex-start' }}
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
          {selected.playlist === ADD_PLAYLIST && (
            <AddPlaylist
              library={library}
              playlists={playlists}
              setLibrary={setLibrary}
              setPlaylists={setPlaylists}
            />
          )}
          {selected.playlist === DATA_FILE.LIBRARY && (
            <LibraryAllSongs
              library={library}
              setColor={setColor}
              setBoxShadow={setBoxShadow}
              handleSelect={handleSelect}
              handleLoad={handleLoad}
              searchSong={searchSong}
              setSearchSong={setSearchSong}
            />
          )}

          {selected.playlist.match(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
          ) && (
            <LibraryPlaylistSongs
              selectedPlaylist={selected.playlist}
              playlists={playlists}
              library={library}
              setColor={setColor}
              setBoxShadow={setBoxShadow}
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
