import { FUNCTIONS, READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { enqueueSnackbar } from 'notistack'
import { convertBufferToSong } from '..'

const readMusicPath = async (path: string) => {
  const { song, filePath, songTags, info }: IMusicResponse =
    await window.electron.ipcRenderer.invoke(FUNCTIONS.READ_MUSIC_PATH, path)

  if (info === READ_MUSIC_STATE.CANCELLED) {
    enqueueSnackbar('Anulowano', { variant: 'warning' })
    return
  }
  if (info === READ_MUSIC_STATE.ERROR) {
    enqueueSnackbar('Błąd podczas otwierania', { variant: 'error' })
    return
  }

  if (!filePath || !song) {
    return { song, songTags, info, filePath }
  }

  const extension = filePath.split('.').pop()
  const convertedSong = convertBufferToSong(song as Buffer, extension!)
  return { song: convertedSong, songTags, info, filePath }
}
export default readMusicPath
