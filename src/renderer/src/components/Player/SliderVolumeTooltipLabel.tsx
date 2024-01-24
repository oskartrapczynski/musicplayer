import { SliderValueLabelProps, Tooltip } from '@mui/material'

const SliderVolumeTooltipLabel = (props: SliderValueLabelProps) => {
  const { children, value } = props
  return (
    <Tooltip enterTouchDelay={0} placement="top" arrow title={`${value}%`}>
      {children}
    </Tooltip>
  )
}

export default SliderVolumeTooltipLabel
