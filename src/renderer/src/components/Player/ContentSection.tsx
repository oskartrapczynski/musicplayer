import { Box, useTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

interface Props {
  children: React.ReactNode
  justifyContent?: string
  alignItems?: string
}

const ContentSection = ({ children, justifyContent = 'center', alignItems = 'center' }: Props) => {
  const {
    palette: { mode: colorMode }
  } = useTheme()

  const backgroundColor = colorMode === 'light' ? grey[200] : grey[800]
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent,
        alignItems,
        width: '100%',
        height: '0px',
        backgroundColor,
        flexGrow: 1
      }}
    >
      {children}
    </Box>
  )
}

export default ContentSection
