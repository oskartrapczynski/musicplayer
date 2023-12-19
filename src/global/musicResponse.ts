import NodeID3 from 'node-id3'
import { READ_MUSIC_STATE } from '.'

export default interface musicResponse {
  song: Buffer | string | undefined
  filePath?: string
  tags?: NodeID3.Tags
  info: READ_MUSIC_STATE
}
