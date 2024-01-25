import { FUNCTIONS, READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { convertBufferToSong } from '@renderer/utils'
import { enqueueSnackbar } from 'notistack'

const readMusicDialog = async () => {
  const {
    song = undefined,
    filePath = undefined,
    songTags = undefined,
    info = READ_MUSIC_STATE.ERROR,
    hotCues = [null, null, null, null]
  }: IMusicResponse = await window.api[FUNCTIONS.READ_MUSIC_DIALOG]()

  const resp = {
    song,
    filePath,
    songTags,
    info,
    hotCues
  }

  try {
    if (info === READ_MUSIC_STATE.CANCELLED) throw { info: 'Anulowano!', variant: 'warning', resp }

    if (info === READ_MUSIC_STATE.ERROR)
      throw { info: 'Błąd podczas otwierania!', variant: 'error', resp }

    if (!filePath || !song) throw { info: 'Nie załadowano!', variant: 'error', resp }
    const extension = filePath!.split('.').pop()
    const convertedSong = convertBufferToSong(song as Buffer, extension!)
    return { song: convertedSong, songTags, info, filePath, hotCues } as IMusicResponse
  } catch (obj) {
    enqueueSnackbar((obj as { info: string }).info, {
      variant: (
        obj as { variant: 'default' | 'warning' | 'success' | 'error' | 'info' | undefined }
      ).variant
    })
    return { ...(obj as { resp: IMusicResponse }).resp } as IMusicResponse
  }
}

export default readMusicDialog
