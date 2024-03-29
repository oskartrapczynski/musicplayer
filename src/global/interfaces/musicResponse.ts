import NodeID3 from 'node-id3'
import { READ_MUSIC_STATE } from '@global/constants'
import { HotCue } from '.'

export default interface IMusicResponse {
  song?: Buffer | string
  filePath?: string
  songTags?: NodeID3.Tags
  info: READ_MUSIC_STATE
  hotCues: HotCue
}
