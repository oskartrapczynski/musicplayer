import { FUNCTIONS, READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { convertBufferToSong } from '@renderer/utils'
import { enqueueSnackbar } from 'notistack'

const readMusicDialog = async () => {
  const {
    song = undefined,
    filePath = undefined,
    songTags = undefined,
    info = READ_MUSIC_STATE.ERROR
  }: IMusicResponse = await window.api[FUNCTIONS.READ_MUSIC_DIALOG]()

  if (info === READ_MUSIC_STATE.CANCELLED) {
    enqueueSnackbar('Anulowano', { variant: 'warning' })
    return { song, filePath, songTags, info } as IMusicResponse
  }
  if (info === READ_MUSIC_STATE.ERROR) {
    enqueueSnackbar('Błąd podczas otwierania', { variant: 'error' })
    return { song, filePath, songTags, info } as IMusicResponse
  }

  const extension = filePath!.split('.').pop()
  const convertedSong = convertBufferToSong(song as Buffer, extension!)
  return { song: convertedSong, songTags, info, filePath } as IMusicResponse
}

export default readMusicDialog
