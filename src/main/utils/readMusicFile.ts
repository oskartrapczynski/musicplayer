import { readFile, existsSync } from 'fs'
import { getResolveAppPath } from '.'

const readMusicFile = async (path: string) => {
  return new Promise<Buffer>((resolve, reject) => {
    if (!existsSync(`${getResolveAppPath('none')}/${path}`)) return reject('File do not exists')
    readFile(`${getResolveAppPath('none')}/${path}`, (err, data) => {
      if (err) {
        reject('Can not open file')
      }
      resolve(data)
    })
  })
}

export default readMusicFile
