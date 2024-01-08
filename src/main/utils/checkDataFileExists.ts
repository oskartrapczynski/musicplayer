import { DATA_FILE } from '@global/constants'
import { existsSync, writeFile } from 'fs'

const checkDataFileExists = (dataFile: DATA_FILE, reject: (reason?: string) => void) => {
  if (!existsSync(`./${dataFile}.json`)) {
    writeFile(`./${dataFile}.json`, JSON.stringify([]), 'utf8', (err) => {
      if (err) reject(`Dont perrmision to create ${dataFile}.json`)
    })
  }
}
export default checkDataFileExists
