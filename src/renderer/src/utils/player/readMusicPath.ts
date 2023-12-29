import { FUNCTIONS } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { convertBufferToSong } from '..'

const readMusicPath = async (path: string) => {
  const { song, filePath, tags, info }: IMusicResponse = await window.electron.ipcRenderer.invoke(
    FUNCTIONS.READ_MUSIC_PATH,
    path
  )
  if (!filePath || !song) {
    return { song, tags, info, filePath }
  }
  const extension = filePath.split('.').pop()
  const convertedSong = convertBufferToSong(song as Buffer, extension!)
  return { song: convertedSong, tags, info, filePath }
}
export default readMusicPath
