import { DATA_FILE } from '@global/constants'
import { IDB } from '@global/interfaces'
import { readFile } from 'fs'
import { checkDataFileExists } from '.'

const readSongLibraryData = async (path: string) => {
  return new Promise<string[] | undefined>((resolve, reject) => {
    const dataFile = DATA_FILE.DB
    checkDataFileExists(dataFile, reject)
    readFile(`./${dataFile}.json`, 'utf8', (err, data) => {
      if (err) return reject('Can not open!')
      if (!data || Object.keys(data).length === 0) return resolve(undefined)
      const db = JSON.parse(data) as IDB
      if (db.library.length === 0) resolve(undefined)
      const songInfo = db.library.filter((item) => item.path === path)
      resolve(songInfo.length === 0 ? undefined : songInfo[0].userTags)
    })
  })
}

export default readSongLibraryData
