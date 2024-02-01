import { READ_MUSIC_STATE } from '@global/constants'
import { IMusicDialogResponse } from '@global/interfaces'
import { dialog } from 'electron'

const handleDialogMusicFileOpen = async () => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'Music files', extensions: ['mp3', 'wav'] }]
    })
    if (canceled) throw new Error(READ_MUSIC_STATE.CANCELLED)
    if (!filePaths.every((path) => Boolean(path) === true)) throw new Error(READ_MUSIC_STATE.ERROR)

    return {
      info: READ_MUSIC_STATE.SUCCESS,
      filePaths
    } as IMusicDialogResponse
  } catch (err) {
    return {
      info: (err as Error).message,
      filePaths: null
    } as IMusicDialogResponse
  }
}

export default handleDialogMusicFileOpen
