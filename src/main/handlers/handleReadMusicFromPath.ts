import { READ_MUSIC_STATE } from '@global/constants'
import { IMusicResponse, ISongLibraryData } from '@global/interfaces'
import { readAudioTags, readMusicFile, readSongLibraryData } from '@main/utils'
import NodeID3 from 'node-id3'

const handleReadMusicFromPath = async (_: Electron.IpcMainInvokeEvent, filePath: string) => {
  let song: undefined | Buffer = undefined,
    songTags: NodeID3.Tags | undefined = undefined,
    userTags: ISongLibraryData | undefined = undefined
  try {
    song = await readMusicFile(filePath)
    if (!song.byteLength) throw new Error(READ_MUSIC_STATE.ERROR)
    songTags = await readAudioTags(song)
    userTags = await readSongLibraryData(filePath)

    return {
      song: song,
      filePath,
      songTags,
      info: READ_MUSIC_STATE.SUCCESS,
      userTags
    } as IMusicResponse
  } catch (err) {
    return {
      song,
      filePath,
      songTags,
      info: (err as Error).message,
      userTags: undefined
    } as IMusicResponse
  }
}
export default handleReadMusicFromPath
