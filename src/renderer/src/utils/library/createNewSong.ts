import { v4 as uuidv4 } from 'uuid'

const createNewSong = (filePath: string) => ({
  songId: uuidv4(),
  path: filePath,
  hotCues: [null, null, null, null]
})

export default createNewSong
