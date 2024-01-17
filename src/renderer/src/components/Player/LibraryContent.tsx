import { Box, Stack } from '@mui/material'

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
}

const LibraryContent = ({
  children,
  position = 'relative',
  width = '100%',
  height = '100%',
  display = 'flex',
  justifyContent = 'center',
  alignItems = 'center',
  zIndex = 1,
  overflow = 'scroll'
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
        overflow,
        '&::-webkit-scrollbar': { display: 'none' }
      }}
    >
      <Stack gap={1} padding={2} zIndex={1}>
        {children}
      </Stack>
    </Box>
  )
}

export default LibraryContent
