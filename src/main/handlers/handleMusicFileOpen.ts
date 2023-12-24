import { READ_MUSIC_STATE, MusicResponse } from '@global'
import { readMusicFile, readAudioTags } from '@main/utils'
import { dialog } from 'electron'

const handleMusicFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Music files', extensions: ['mp3', 'wav'] }]
  })
  try {
    if (canceled) throw new Error(READ_MUSIC_STATE.CANCELLED)
    const data = await readMusicFile(filePaths[0])
    if (!data) throw new Error(READ_MUSIC_STATE.ERROR)
    const audioTags = readAudioTags(data, filePaths[0])

    return {
      song: data,
      filePath: filePaths[0],
      tags: audioTags,
      info: READ_MUSIC_STATE.SUCCESS
    } as MusicResponse
  } catch (err) {
    return { song: undefined, info: (err as Error).message }
  }
}

export default handleMusicFileOpen
