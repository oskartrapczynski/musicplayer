import { ILibrary, IPlaylist } from '@global/interfaces'

interface Params {
  playlistArrayId: number | null
  playlists: IPlaylist[]
  savedInLibrary: ILibrary[]
  notSavedInLibrary: ILibrary[]
}

const addSongToPlaylist = async ({
  playlistArrayId,
  playlists,
  savedInLibrary,
  notSavedInLibrary
}: Params) => {
  try {
    if (playlistArrayId === null) throw new Error('missing playlistId')
    if (playlistArrayId === -1) throw new Error('can not find index of playlist')

    const savedInLibrarySongIds = savedInLibrary.map(({ songId }) => songId)
    const notSavedInLibrarySongIds = notSavedInLibrary.map(({ songId }) => songId)

    const filteredSavedInLibrarySongIds = savedInLibrarySongIds.filter(
      (songId) => !playlists[playlistArrayId].songs.includes(songId)
    )

    const newPlaylists: IPlaylist[] = JSON.parse(JSON.stringify(playlists))

    if (!filteredSavedInLibrarySongIds.length) {
      newPlaylists[playlistArrayId].songs.push(...notSavedInLibrarySongIds)
      return newPlaylists
    }

    newPlaylists[playlistArrayId].songs.push(
      ...notSavedInLibrarySongIds,
      ...filteredSavedInLibrarySongIds
    )

    return newPlaylists
  } catch (err) {
    console.log((err as Error).message)
    return playlists
  }
}

export default addSongToPlaylist
