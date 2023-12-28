import { IMusicResponse } from '@global/interfaces'
import { convertBufferToSong } from '@renderer/utils'

const openDialogMusicFile = async () => {
  const { song, filePath, tags, info }: IMusicResponse = await window.api.openMusic()
  if (!filePath || !song) {
    return { song, tags, info, filePath }
  }
  const extension = filePath.split('.').pop()
  const convertedSong = convertBufferToSong(song as Buffer, extension!)
  return { song: convertedSong, tags, info, filePath }
}

export default openDialogMusicFile
