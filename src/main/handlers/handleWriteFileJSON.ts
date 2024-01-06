import { DATA_FILE } from '@global/constants'
import { ILibrary } from '@global/interfaces'
import { existsSync, writeFile } from 'fs'

const handleWriteFileJSON = async (
  _: Electron.IpcMainInvokeEvent,
  type: DATA_FILE,
  data: ILibrary[]
) => {
  return new Promise<string>((resolve, reject) => {
    if (!existsSync(`./${type}.json`)) {
      writeFile(`./${type}.json`, JSON.stringify([]), 'utf8', (err) => {
        if (err) reject(`Dont perrmision to create ${type}.json`)
      })
      reject('Library dont exists, created new empty one')
    }
    writeFile(`./${type}.json`, JSON.stringify(data), 'utf8', (err) => {
      if (err) reject(`Dont perrmision to create ${type}.json`)
    })
    resolve(`Added new item to ${type}`)
  })
}

export default handleWriteFileJSON
