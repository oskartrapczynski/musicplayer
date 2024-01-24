import { ILibrary } from '@global/interfaces'

interface Params {
  library: ILibrary[] | null
  songIds: string | string[]
}

const getSongsById = async ({ library, songIds }: Params) => {
  if (!library || library.length === 0) return []
  const librarySongs = library.filter(({ songId }) => {
    return songIds?.includes(songId)
  })

  if (typeof songIds === 'string') return librarySongs

  return librarySongs.sort((a, b) => songIds.indexOf(a.songId) - songIds.indexOf(b.songId))
}

export default getSongsById
