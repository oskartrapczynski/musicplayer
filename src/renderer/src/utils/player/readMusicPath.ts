import { FUNCTIONS, READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { enqueueSnackbar } from 'notistack'
import { convertBufferToSong } from '..'

const readMusicPath = async (path: string) => {
  let song = undefined,
    filePath = undefined,
    songTags = undefined,
    info = READ_MUSIC_STATE.ERROR,
    hotCues
  try {
    const {
      song = undefined,
      filePath = undefined,
      songTags = undefined,
      info = READ_MUSIC_STATE.ERROR,
      hotCues
    }: IMusicResponse = await window.electron.ipcRenderer.invoke(FUNCTIONS.READ_MUSIC_PATH, path)

    if (info === READ_MUSIC_STATE.CANCELLED) throw { info: 'Anulowano!', variant: 'warning' }

    if (info === READ_MUSIC_STATE.ERROR)
      throw { info: 'Błąd podczas otwierania!', variant: 'error' }

    if (!filePath || !song) throw { info: 'Nie załadowano!', variant: 'error' }

    const extension = filePath.split('.').pop()
    const convertedSong = convertBufferToSong(song as Buffer, extension!)
    enqueueSnackbar('Załadowano utwór!', { variant: 'success' })
    return { song: convertedSong, songTags, info, filePath, hotCues } as IMusicResponse
  } catch (obj) {
    enqueueSnackbar((obj as { info: string }).info, {
      variant: (
        obj as { variant: 'default' | 'warning' | 'success' | 'error' | 'info' | undefined }
      ).variant
    })
    return { song, songTags, info, filePath, hotCues } as IMusicResponse
  }
}
export default readMusicPath
