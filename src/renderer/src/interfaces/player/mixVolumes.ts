import { PLAYER } from '@renderer/constants'
import { IMixVolume } from '..'

export default interface IMixVolumes {
  [PLAYER.one]: IMixVolume | null
  [PLAYER.two]: IMixVolume | null
}
