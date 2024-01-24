import { READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse } from '@global/interfaces'
import { readAudioTags, readMusicFile, readSongLibraryData } from '@main/utils'
import NodeID3 from 'node-id3'

const handleReadMusicFromPath = async (_: Electron.IpcMainInvokeEvent, filePath: string) => {
  let song: undefined | Buffer = undefined,
    songTags: NodeID3.Tags | undefined = undefined,
    hotCues: (number | null)[] | undefined = undefined
  try {
    if (!filePath) throw new Error(READ_MUSIC_STATE.ERROR)
    song = await readMusicFile(filePath)
    if (!song.byteLength) throw new Error(READ_MUSIC_STATE.ERROR)
    songTags = await readAudioTags(song)
    hotCues = await readSongLibraryData(filePath)
    hotCues = hotCues ? hotCues : [null, null, null, null]

    return {
      song: song,
      filePath,
      songTags,
      info: READ_MUSIC_STATE.SUCCESS,
      hotCues
    } as IMusicResponse
  } catch (err) {
    return {
      song: undefined,
      filePath: undefined,
      songTags: undefined,
      info: (err as Error).message,
      hotCues
    } as IMusicResponse
  }
}
export default handleReadMusicFromPath
