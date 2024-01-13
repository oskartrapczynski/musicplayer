import { ILibrary } from '@global/interfaces'
import { getFileName } from '@global/utils'

const searchPathFromWords = (
  paths: ILibrary[] | string[],
  searchSong: string,
  type: 'library' | 'playlist'
): ILibrary[] | string[] => {
  if (type === 'playlist') {
    return (paths as string[]).filter((path) => {
      const searchWords = searchSong.split(' ').map((word) => word.toLowerCase())
      const matchWords = searchWords.map((word) => getFileName(path).toLowerCase().includes(word))
      return matchWords.filter((item) => item).length === searchWords.length
    })
  }

  return (paths as ILibrary[]).filter(({ path }) => {
    const searchWords = searchSong.split(' ').map((word) => word.toLowerCase())
    const matchWords = searchWords.map((word) => getFileName(path).toLowerCase().includes(word))
    return matchWords.filter((item) => item).length === searchWords.length
  })
}

export default searchPathFromWords
