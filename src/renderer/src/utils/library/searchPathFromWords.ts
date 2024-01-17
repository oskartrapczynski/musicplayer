import { getFileName } from '@global/utils'
import { ILibrary } from '@global/interfaces'
import { ISongPath } from '@renderer/interfaces'

interface Params {
  paths: ISongPath[]
  searchSong: string
}

const searchPathFromWords = ({ paths, searchSong }: Params): ILibrary[] =>
  (paths as ILibrary[]).filter(({ path }) => {
    const searchWords = searchSong.split(' ').map((word) => word.toLowerCase())
    const matchWords = searchWords.map((word) => getFileName(path).toLowerCase().includes(word))
    return matchWords.filter((item) => item).length === searchWords.length
  })

export default searchPathFromWords
