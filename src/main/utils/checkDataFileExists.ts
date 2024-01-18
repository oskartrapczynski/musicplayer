import { DATA_FILE } from '@global/constants'
import { existsSync, writeFile } from 'fs'
import { getAppFilePath } from '.'

const checkDataFileExists = (dataFile: DATA_FILE, reject: (reason?: string) => void) => {
  if (!existsSync(`${getAppFilePath()}/${dataFile}.json`)) {
    writeFile(
      `${getAppFilePath()}/${dataFile}.json`,
      JSON.stringify({ library: null, playlist: null }),
      'utf8',
      (err) => {
        if (err) reject(`Dont perrmision to create ${dataFile}.json`)
      }
    )
  }
}
export default checkDataFileExists
