import { HotCue } from '.'

export default interface ILibrary {
  songId: string
  path: string
  hotCues: HotCue
}
