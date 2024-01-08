import { DATA_FILE } from '@global/constants'
import { readFile } from 'fs'
import { checkDataFileExists } from '.'

const readFileJSON = async (dataFile: DATA_FILE) => {
  return new Promise<unknown>((resolve, reject) => {
    checkDataFileExists(dataFile, reject)
    readFile(`./${dataFile}.json`, 'utf8', (err, data) => {
      if (err) return reject('Can not open!')
      if (!data) return reject('File is empty!')
      resolve(JSON.parse(data))
    })
  })
}

export default readFileJSON
