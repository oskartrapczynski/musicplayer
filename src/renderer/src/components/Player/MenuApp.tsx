import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import NightlifeIcon from '@mui/icons-material/Nightlife'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, IconButton, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { SwitchAppMode } from '@renderer/components'
import { APP_MODE } from '@renderer/constants'

interface Props {
  appMode: APP_MODE
  setAppMode: React.Dispatch<React.SetStateAction<APP_MODE>>
}

const MenuApp = ({ appMode, setAppMode }: Props) => {
  return (
    <Box sx={{ width: '75px', backgroundColor: 'red' }}>
      <Stack direction="column" spacing="20px" sx={{ alignItems: 'center', mt: '20px' }}>
        <Link to="/">
          <IconButton>
            <LibraryMusicIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/queue">
          <IconButton>
            <QueueMusicIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/genres">
          <IconButton>
            <NightlifeIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/settings">
          <IconButton>
            <SettingsIcon fontSize="large" />
          </IconButton>
        </Link>
        <SwitchAppMode appMode={appMode} setAppMode={setAppMode} />
      </Stack>
    </Box>
  )
}

export default MenuApp
