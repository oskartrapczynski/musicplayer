import { SvgIconTypeMap, Box, Stack } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

interface Props {
  children: React.ReactNode
  position?: string
  width?: string
  height?: string
  display?: string
  justifyContent?: string
  alignItems?: string
  zIndex?: 1
  overflow?: string
  iconSize?: string
  iconColor?: string
  Icon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
}

const BackgroundIcon = ({
  children,
  position = 'relative',
  width = '100%',
  height = '100%',
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
  zIndex = 1,
  overflow = 'hidden',
  iconSize = '100vh',
  iconColor = '#fff',
  Icon
}: Props) => {
  return (
    <Box
      sx={{
        position,
        width,
        height,
        display,
        justifyContent,
        alignItems,
        zIndex,
        overflow
      }}
    >
      <Stack gap={1} padding={2} zIndex={1}>
        {children}
      </Stack>
      {Icon && (
        <Icon
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: iconSize,
            color: iconColor,
            zIndex: 0
          }}
        />
      )}
    </Box>
  )
}

export default BackgroundIcon
