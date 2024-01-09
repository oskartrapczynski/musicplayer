import { DATA_FILE } from '@global/constants'
import { ISongLibraryData } from '@global/interfaces'
import { readFile } from 'fs'
import { checkDataFileExists } from '.'

const readSongLibraryData = async (path: string) => {
  return new Promise<ISongLibraryData | undefined>((resolve, reject) => {
    const dataFile = DATA_FILE.LIBRARY
    checkDataFileExists(dataFile, reject)
    readFile(`./${dataFile}.json`, 'utf8', (err, data) => {
      if (err) return reject('Can not open!')
      if (!data) return resolve(undefined)
      const songsInfo = JSON.parse(data) as ISongLibraryData[]
      if (!songsInfo || songsInfo?.length === 0) resolve(undefined)
      const songInfo = songsInfo.filter((item) => item.path === path)
      resolve(songInfo.length === 0 ? undefined : songInfo[0])
    })
  })
}

export default readSongLibraryData
