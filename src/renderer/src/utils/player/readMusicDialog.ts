import { FUNCTIONS, READ_MUSIC_STATE } from '@global/constants'
import { IMusicDialogResponse } from '@global/interfaces'
import { enqueueSnackbar } from 'notistack'

const readMusicDialog = async () => {
  const { info = READ_MUSIC_STATE.ERROR, filePaths = null }: IMusicDialogResponse =
    await window.api[FUNCTIONS.READ_MUSIC_DIALOG]()

  const resp = {
    info,
    filePaths
  }

  try {
    if (info === READ_MUSIC_STATE.CANCELLED) throw { info: 'Anulowano!', variant: 'warning', resp }

    if (info === READ_MUSIC_STATE.ERROR)
      throw { info: 'Błąd podczas otwierania!', variant: 'error', resp }

    if (!filePaths) throw { info: 'Nie załadowano!', variant: 'error', resp }

    return { ...resp } as IMusicDialogResponse
  } catch (obj) {
    enqueueSnackbar((obj as { info: string }).info, {
      variant: (
        obj as { variant: 'default' | 'warning' | 'success' | 'error' | 'info' | undefined }
      ).variant
    })
    return { ...(obj as { resp: IMusicDialogResponse }).resp } as IMusicDialogResponse
  }
}

export default readMusicDialog
