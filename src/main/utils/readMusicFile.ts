import { readFile, existsSync } from 'fs'

const readMusicFile = async (path: string) => {
  return new Promise<Buffer>((resolve, reject) => {
    if (!existsSync(path)) return reject('File do not exists')
    readFile(path, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

export default readMusicFile
