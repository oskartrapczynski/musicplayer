import { IDB } from '@global/interfaces'
import { dialog } from 'electron'
import { writeFile } from 'fs'

const handleDialogExportFile = async (_: Electron.IpcMainInvokeEvent, data: IDB[]) => {
  try {
    const { filePath, canceled } = await dialog.showSaveDialog({
      filters: [{ name: 'Baza muzyki', extensions: ['json'] }],
      defaultPath: 'db.json'
    })

    if (!filePath || canceled) throw new Error()
    writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
      if (err) throw err
    })
    return true
  } catch {
    return false
  }
}
export default handleDialogExportFile
