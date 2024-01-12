import { ILibrary, IPlaylist } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, Button } from '@mui/material'
import { InputSearch } from '..'

interface Props {
  playlists: IPlaylist[]
  selectedPlaylist: string
  library: ILibrary[]
  setVariant: (path: string) => 'text' | 'contained'
  setColor: (path: string) => 'success' | 'warning' | 'primary'
  handleSelect: (data: { playlist: string; path: string }) => void
  handleLoad: (path: string) => Promise<void>
  searchSong: string
  setSearchSong: React.Dispatch<React.SetStateAction<string>>
}

const LibraryPlaylistSongs = ({
  playlists,
  selectedPlaylist,
  library,
  setVariant,
  setColor,
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
      <>
        <InputSearch value={searchSong} setValue={setSearchSong} />
        {filteredLibrary.map((path, index) => {
          return (
            <Button
              key={index}
              variant={setVariant(path)}
              color={setColor(path)}
              onClick={() => handleSelect({ playlist: playlistId, path: path })}
              onDoubleClick={() => handleLoad(path)}
            >
              {getFileName(path)}
            </Button>
          )
        })}
      </>
    )
  } catch (err) {
    return <Alert severity="warning">{(err as Error).message}</Alert>
  }
}

export default LibraryPlaylistSongs
