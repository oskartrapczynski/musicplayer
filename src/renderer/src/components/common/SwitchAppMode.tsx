import { APP_MODE } from '@renderer/constants'
import { Box } from '@mui/material'
import { activeItemStyle, containerStyle, itemStyle } from './SwitchAppMode.style'

interface Props {
  appMode: APP_MODE
  setAppMode: React.Dispatch<React.SetStateAction<APP_MODE>>
}

const SwitchAppMode = ({ appMode, setAppMode }: Props) => {
  const handleClick = (mode: APP_MODE) => {
    if (mode === APP_MODE.NORMAL) setAppMode(APP_MODE.NORMAL)
    if (mode === APP_MODE.PRO) setAppMode(APP_MODE.PRO)
  }
  return (
    <Box sx={containerStyle}>
      <Box
        sx={appMode === APP_MODE.NORMAL ? activeItemStyle : itemStyle}
        onClick={() => handleClick(APP_MODE.NORMAL)}
      >
        Normal
      </Box>
      <Box
        sx={appMode === APP_MODE.PRO ? activeItemStyle : itemStyle}
        onClick={() => handleClick(APP_MODE.PRO)}
      >
        Pro
      </Box>
    </Box>
  )
}

export default SwitchAppMode
