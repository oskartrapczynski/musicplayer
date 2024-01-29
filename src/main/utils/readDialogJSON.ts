import { IDB } from '@global/interfaces'
import { readFile } from 'fs'

const readDialogJSON = (filepath: string) => {
  return new Promise<IDB | null>((resolve, reject) => {
    readFile(filepath, 'utf8', (err, data) => {
      if (err) return reject('Can not open!')
      if (!data) return resolve(null)
      resolve(JSON.parse(data))
    })
  })
}

export default readDialogJSON
