import { APP_MODE } from '@renderer/constants'
import { Box, SxProps, Theme, useTheme } from '@mui/material'
interface Props {
  appMode: APP_MODE
  setAppMode: React.Dispatch<React.SetStateAction<APP_MODE>>
}

const SwitchAppMode = ({ appMode, setAppMode }: Props) => {
  const {
    palette: {
      mode: colorMode,
      common: { white, black }
    }
  } = useTheme()

  const color = colorMode === 'light' ? black : white
  const activeColor = colorMode === 'light' ? white : black

  const containerStyle: SxProps<Theme> = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '90%',
    border: `2px solid ${color}`,
    borderRadius: '5px',
    p: '3px'
  }

  const itemStyle: SxProps<Theme> = {
    width: '100%',
    my: '1px',
    textTransform: 'uppercase',
    fontSize: '10px',
    textAlign: 'center',
    border: '2px solid alpha',
    borderRadius: '3px',
    cursor: 'pointer'
  }

  const activeItemStyle: SxProps<Theme> = {
    ...itemStyle,
    backgroundColor: color,
    color: activeColor
  }

  const handleClick = (mode: APP_MODE) => {
    if (mode === APP_MODE.NORMAL) setAppMode(APP_MODE.NORMAL)
    if (mode === APP_MODE.PRO) setAppMode(APP_MODE.PRO)
  }
  return (
    <Box sx={{ ...containerStyle, borderColor: color }}>
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
