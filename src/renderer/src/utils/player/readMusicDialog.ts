import { FUNCTIONS } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { convertBufferToSong } from '@renderer/utils'

const readMusicDialog = async () => {
  const { song, filePath, tags, info }: IMusicResponse =
    await window.api[FUNCTIONS.READ_MUSIC_DIALOG]()
  if (!filePath || !song) {
    return { song, tags, info, filePath }
  }
  const extension = filePath.split('.').pop()
  const convertedSong = convertBufferToSong(song as Buffer, extension!)
  return { song: convertedSong, tags, info, filePath }
}

export default readMusicDialog
