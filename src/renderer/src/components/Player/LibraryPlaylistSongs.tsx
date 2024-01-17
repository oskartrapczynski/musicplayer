import { useState, useEffect } from 'react'
import { ILibrary, IMusicResponse, IPlaylist } from '@global/interfaces'
import { getFileName } from '@global/utils'
import { Alert, Button } from '@mui/material'
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
  selectedPlaylist: string
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

const LibraryPlaylistSongs = ({
  playlists,
  selectedPlaylist,
  library,
  handleSelect,
  handleLoad,
  searchSong,
  setSearchSong,
  player,
  selected
}: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<ISongPath[] | null>(null)

  const [playlistId, setPlaylistId] = useState<string | null>(null)

  const loadSongs = async () => {
    const playlistArrayId = playlists.findIndex(({ playlistId }) => selectedPlaylist === playlistId)
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
  }, [searchSong, selectedPlaylist])

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
                    boxShadow: setLibraryContentBoxShadow({ path, player, selected })
                  }}
                  variant="contained"
                  color={setLibraryContentColor({ path, player, selected })}
                  onClick={() => handleSelect({ playlist: playlistId as string, path })}
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
