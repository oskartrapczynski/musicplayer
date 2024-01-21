import { getFileName } from '@global/utils'
import { ILibrary } from '@global/interfaces'

interface Params {
  library: ILibrary[]
  searchSong: string
}

const searchPathFromWords = ({ library, searchSong }: Params): ILibrary[] =>
  library.filter(({ path }) => {
    const searchWords = searchSong.split(' ').map((word) => word.toLowerCase())
    const matchWords = searchWords.map((word) => getFileName(path).toLowerCase().includes(word))
    return matchWords.filter((isMatch) => isMatch).length === searchWords.length
  })

export default searchPathFromWords
