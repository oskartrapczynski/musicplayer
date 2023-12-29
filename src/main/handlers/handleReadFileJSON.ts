import { DATA_FILE } from '@global/constants'
import { readFile, existsSync, writeFile } from 'fs'

const handleReadFileJSON = async (_: Electron.IpcMainInvokeEvent, type: DATA_FILE) => {
  return new Promise<JSON>((resolve, reject) => {
    if (!existsSync(`./${type}.json`)) {
      writeFile(`./${type}.json`, JSON.stringify([]), 'utf8', (err) => {
        if (err) reject(`Dont perrmision to create ${type}.json`)
      })
    }
    readFile(`./${type}.json`, 'utf8', (err, data) => {
      if (err) return reject('Can not open!')
      if (!data) return reject('File is empty!')
      resolve(JSON.parse(data))
    })
  })
}

export default handleReadFileJSON
