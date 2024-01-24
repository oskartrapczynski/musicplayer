import { Box } from '@mui/material'

interface Props {
  children: React.ReactNode
}

const ContentSection = ({ children }: Props) => {
  return (
    <Box
      sx={{ display: 'flex', width: '100%', height: '0px', backgroundColor: 'blue', flexGrow: 1 }}
    >
      {children}
    </Box>
  )
}

export default ContentSection
