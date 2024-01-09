import { FUNCTIONS, READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { enqueueSnackbar } from 'notistack'
import { convertBufferToSong } from '..'

const readMusicPath = async (path: string) => {
  const {
    song = undefined,
    filePath = undefined,
    songTags = undefined,
    info = READ_MUSIC_STATE.ERROR,
    userTags = undefined
  }: IMusicResponse = await window.electron.ipcRenderer.invoke(FUNCTIONS.READ_MUSIC_PATH, path)

  if (info === READ_MUSIC_STATE.CANCELLED) {
    enqueueSnackbar('Anulowano', { variant: 'warning' })
    return
  }
  if (info === READ_MUSIC_STATE.ERROR) {
    enqueueSnackbar('Błąd podczas otwierania', { variant: 'error' })
    return
  }

  if (!filePath || !song) {
    return { song, songTags, info, filePath, userTags } as IMusicResponse
  }

  const extension = filePath.split('.').pop()
  const convertedSong = convertBufferToSong(song as Buffer, extension!)
  enqueueSnackbar('Załadowano utwór', { variant: 'success' })
  return { song: convertedSong, songTags, info, filePath, userTags } as IMusicResponse
}
export default readMusicPath
