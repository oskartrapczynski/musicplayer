import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { checkDataFileExists, getResolveAppPath } from '@main/utils'
import { writeFile } from 'fs'

const handleWriteFileJSON = async (
  _: Electron.IpcMainInvokeEvent,
  dataFile: DATA_FILE,
  data: ILibrary[]
) => {
  return new Promise<string>((resolve, reject) => {
    checkDataFileExists(dataFile, reject)
    writeFile(`${getResolveAppPath()}/${dataFile}.json`, JSON.stringify(data), 'utf8', (err) => {
      if (err) reject(`Dont perrmision to create ${dataFile}.json`)
    })
    resolve(`Added new item to ${dataFile}`)
  })
}

export default handleWriteFileJSON
