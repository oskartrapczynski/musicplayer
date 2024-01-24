import { HotCue } from '@renderer/interfaces'

export default interface ILibrary {
  songId: string
  path: string
  hotCues: HotCue
}
