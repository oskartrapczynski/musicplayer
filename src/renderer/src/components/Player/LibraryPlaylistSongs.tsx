import { ILibrary, IPlaylist } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, alpha, Button } from '@mui/material'
import { BackgroundIcon, InputSearch } from '..'
import { List as ListIcon } from '@mui/icons-material'

interface Props {
  playlists: IPlaylist[]
  selectedPlaylist: string
  library: ILibrary[]
  setColor: (path: string) => 'success' | 'warning' | 'primary'
  setBoxShadow: (path: string) => string | null
  handleSelect: (data: { playlist: string; path: string }) => void
  handleLoad: (path: string) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
}

const LibraryPlaylistSongs = ({
  playlists,
  selectedPlaylist,
  library,
  setColor,
  setBoxShadow,
  handleSelect,
  handleLoad,
  searchSong,
  setSearchSong
}: Props) => {
  try {
    const playlistArrayId = playlists.findIndex(({ playlistId }) => selectedPlaylist === playlistId)
    if (playlistArrayId === -1) throw new Error('Lista odtwarzania jest pusta')
    const { playlistId, songs } = playlists[playlistArrayId]
    if (songs.length === 0) throw new Error('Lista odtwarzania jest pusta')

    const songPaths = songs.map(({ songId }) => {
      const { path } = library.filter(({ songId: librarySongId }) => librarySongId === songId)[0]
      return path
    })

    const filteredLibrary = searchSong
      ? songPaths.filter((path) =>
          getFileName(path).toLowerCase().includes(searchSong.toLowerCase())
        )
      : songPaths

    console.log(filteredLibrary)

    return (
      <BackgroundIcon
        Icon={ListIcon}
        iconColor={alpha('#000', 0.1)}
        alignItems={'flex-start'}
        iconSize="100vh"
      >
        <InputSearch value={searchSong} setValue={setSearchSong} />
        {filteredLibrary.map((path, index) => {
          return (
            <Button
              key={index}
              sx={{ boxShadow: setBoxShadow(path) }}
              variant="contained"
              color={setColor(path)}
              onClick={() => handleSelect({ playlist: playlistId, path: path })}
              onDoubleClick={() => handleLoad(path)}
            >
              {getFileName(path)}
            </Button>
          )
        })}
      </BackgroundIcon>
    )
  } catch (err) {
    return (
      <BackgroundIcon
        Icon={ListIcon}
        iconColor={alpha('#000', 0.1)}
        alignItems={'flex-start'}
        iconSize="100vh"
      >
        <Alert severity="warning">{(err as Error).message}</Alert>
      </BackgroundIcon>
    )
  }
}

export default LibraryPlaylistSongs
