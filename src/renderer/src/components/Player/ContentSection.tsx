import { Box } from '@mui/material'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const ContentSection = ({ children }: Props) => {
  return (
    <Box sx={{ width: '100%', height: '0px', backgroundColor: 'blue', flexGrow: 1 }}>
      {children}
    </Box>
  )
}

export default ContentSection
