import {
  Album as AlbumIcon,
  LibraryMusic as LibraryMusicIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'
import { Box, IconButton, Stack, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import { SwitchAppMode } from '@renderer/components'
import { APP_MODE, ROUTE } from '@renderer/constants'

interface Props {
  appMode: APP_MODE
  setAppMode: React.Dispatch<React.SetStateAction<APP_MODE>>
}

const MenuApp = ({ appMode, setAppMode }: Props) => {
  const {
    palette: {
      mode: colorMode,
      common: { white, black }
    }
  } = useTheme()

  const color = colorMode === 'light' ? black : white

  return (
    <Box sx={{ width: '75px' }}>
      <Stack direction="column" spacing="20px" sx={{ alignItems: 'center', mt: '20px' }}>
        <Link to="/">
          <IconButton>
            <AlbumIcon fontSize="large" htmlColor={color} />
          </IconButton>
        </Link>
        <Link to={`/${ROUTE.LIBRARY}`}>
          <IconButton>
            <LibraryMusicIcon fontSize="large" htmlColor={color} />
          </IconButton>
        </Link>
        <Link to={`/${ROUTE.SETTINGS}`}>
          <IconButton>
            <SettingsIcon fontSize="large" htmlColor={color} />
          </IconButton>
        </Link>
        <SwitchAppMode appMode={appMode} setAppMode={setAppMode} />
      </Stack>
    </Box>
  )
}

export default MenuApp
