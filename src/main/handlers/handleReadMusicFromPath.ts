import { READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { readAudioTags, readMusicFile } from '@main/utils'

const handleReadMusicFromPath = async (_: Electron.IpcMainInvokeEvent, path: string) => {
  try {
    const data = await readMusicFile(path)
    if (!data.byteLength) throw new Error(READ_MUSIC_STATE.ERROR)
    const audioTags = readAudioTags(data)
    return {
      song: data,
      filePath: path,
      tags: audioTags,
      info: READ_MUSIC_STATE.SUCCESS
    } as IMusicResponse
  } catch (err) {
    return {
      song: undefined,
      filePath: undefined,
      tags: undefined,
      info: (err as Error).message
    } as IMusicResponse
  }
}
export default handleReadMusicFromPath
