import { MusicResponse } from '@global'
import { convertBufferToSong } from '@renderer/utils'

const openDialogMusicFile = async () => {
  const { song, filePath, tags, info }: MusicResponse = await window.api.openMusic()
  if (!filePath || !song) {
    return { song, tags, info }
  }
  const extension = filePath.split('.').pop()
  const convertedSong = convertBufferToSong(song as Buffer, extension!)
  return { song: convertedSong, tags, info }
}

export default openDialogMusicFile
