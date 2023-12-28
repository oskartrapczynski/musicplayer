import { DATA_FILE } from '@global/constants'
import { readFile } from 'fs'

const handleReadFileJSON = async (_: Electron.IpcMainInvokeEvent, type: DATA_FILE) => {
  return new Promise<JSON>((resolve, reject) => {
    readFile(`./${type}.json`, 'utf8', (err, data) => {
      if (err) reject(err)
      if (!data) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

export default handleReadFileJSON
