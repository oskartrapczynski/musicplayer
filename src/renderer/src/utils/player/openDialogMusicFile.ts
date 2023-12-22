import { MusicResponse, READ_MUSIC_STATE } from '../../../../global'
import { convertBufferToSong } from '..'

const openDialogMusicFile = async () => {
  try {
    const { song, filePath, tags, info }: MusicResponse = await window.api.openMusic()
    if (!filePath || !song) throw new Error(READ_MUSIC_STATE.ERROR)
    const extension = filePath.split('.').pop()
    const convertedSong = convertBufferToSong(song as Buffer, extension!)
    return { song: convertedSong, tags, info }
  } catch (err) {
    return { song: undefined, info: (err as Error).message }
  }
}

export default openDialogMusicFile
