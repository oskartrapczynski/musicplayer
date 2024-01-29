import { READ_MUSIC_STATE } from '@global/constants'
import { IResponseFileJSON } from '@global/interfaces'
import { readDialogJSON } from '@main/utils'
import { dialog } from 'electron'

const handleDialogImportFile = async () => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Baza muzyki', extensions: ['json'] }]
    })
    if (canceled || !filePaths[0]) throw new Error(READ_MUSIC_STATE.CANCELLED)

    console.log(filePaths[0])

    const data = await readDialogJSON(filePaths[0])

    console.log(data)
    return { data, info: 'Read successful' } as IResponseFileJSON
  } catch (err) {
    return { data: null, info: (err as Error).message } as IResponseFileJSON
  }
}

export default handleDialogImportFile
