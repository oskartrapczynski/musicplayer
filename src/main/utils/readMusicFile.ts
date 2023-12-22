import { readFile } from 'fs'

const readMusicFile = async (path) => {
  return new Promise<Buffer>((resolve, reject) => {
    readFile(path, function (err, data) {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

export default readMusicFile
