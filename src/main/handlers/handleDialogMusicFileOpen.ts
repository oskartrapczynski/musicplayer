import { READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { readMusicFile, readAudioTags } from '@main/utils'
import { dialog } from 'electron'
import NodeID3 from 'node-id3'

const handleDialogMusicFileOpen = async () => {
  let song: string | Buffer | undefined = undefined,
    songTags: NodeID3.Tags | undefined = undefined

  try {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Music files', extensions: ['mp3', 'wav'] }]
    })
    if (canceled) throw new Error(READ_MUSIC_STATE.CANCELLED)
    song = await readMusicFile(filePaths[0])
    if (!song.byteLength) throw new Error(READ_MUSIC_STATE.ERROR)
    songTags = await readAudioTags(song)

    return {
      song,
      filePath: filePaths[0],
      songTags,
      info: READ_MUSIC_STATE.SUCCESS
    } as IMusicResponse
  } catch (err) {
    return {
      song,
      filePath: undefined,
      songTags,
      info: (err as Error).message
    } as IMusicResponse
  }
}

export default handleDialogMusicFileOpen
