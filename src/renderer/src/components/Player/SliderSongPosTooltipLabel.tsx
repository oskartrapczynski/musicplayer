import { SliderValueLabelProps, Tooltip } from '@mui/material'
import { secondsToMusicTime } from '@renderer/utils'

const SliderSongPosTooltipLabel = (props: SliderValueLabelProps) => {
  const { children, value } = props
  return (
    <Tooltip enterTouchDelay={0} placement="top" arrow title={secondsToMusicTime(value)}>
      {children}
    </Tooltip>
  )
}

export default SliderSongPosTooltipLabel
