import { useState, useEffect } from 'react'
import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, Button, useTheme } from '@mui/material'
import { LibraryContent, InputSearch } from '..'
import {
  getSongsById,
  searchPathFromWords,
  setLibraryContentBoxShadow,
  setLibraryContentColor
} from '@renderer/utils'
import { IReadMusicPath, ISongPath } from '@renderer/interfaces'

interface Props {
  playlists: IPlaylist[]
  library: ILibrary[]
  setSelected: React.Dispatch<
    React.SetStateAction<{
      playlist: string
      path: string
    }>
  >
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

const LibraryPlaylistSongs = ({
  playlists,
  library,
  setSelected,
  handleLoad,
  searchSong,
  setSearchSong,
  player,
  selected
}: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<ISongPath[] | null>(null)
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { palette } = useTheme()

  const loadSongs = async () => {
    const playlistArrayId = playlists.findIndex(
      ({ playlistId }) => selected.playlist === playlistId
    )
    if (playlistArrayId === -1) return setFilteredLibrary([])
    const { playlistId, songs } = playlists[playlistArrayId]
    if (songs.length === 0) return setFilteredLibrary([])

    const librarySongs = await getSongsById({ library, songIds: songs })
    const librarySongsPaths = librarySongs.map(({ path }) => ({
      path
    }))

    const filteredLibraryPaths = searchSong
      ? searchPathFromWords({ paths: librarySongsPaths, searchSong })
      : librarySongsPaths

    if (filteredLibraryPaths.length === 0) return setFilteredLibrary([])
    setFilteredLibrary(filteredLibraryPaths)
    setPlaylistId(playlistId)
  }

  useEffect(() => {
    loadSongs()
  }, [searchSong, selected.playlist])

  return (
    <>
      {!filteredLibrary ? (
        <div>Loading</div>
      ) : (
        <LibraryContent alignItems={'flex-start'}>
          <InputSearch value={searchSong} setValue={setSearchSong} />
          {filteredLibrary.length > 0 ? (
            <>
              {filteredLibrary.map(({ path }, index) => (
                <Button
                  key={index}
                  sx={{
                    boxShadow: setLibraryContentBoxShadow({ path, player, selected, palette })
                  }}
                  variant="contained"
                  color={setLibraryContentColor({ path, player, selected })}
                  onClick={() => setSelected({ playlist: playlistId as string, path })}
                  onDoubleClick={() =>
                    handleLoad({ filePath: path, locationSong: playlistId as string })
                  }
                >
                  {getFileName(path)}
                </Button>
              ))}
            </>
          ) : (
            <Alert severity="warning">Lista odtwarzania jest pusta</Alert>
          )}
        </LibraryContent>
      )}
    </>
  )
}

export default LibraryPlaylistSongs
