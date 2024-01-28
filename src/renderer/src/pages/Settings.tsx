import { Button, FormControlLabel, Stack, Switch } from '@mui/material'
import { ContentSection } from '@renderer/components'

interface Props {
  colorMode: 'light' | 'dark'
  setColorMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}

const SettingsPage = ({ colorMode, setColorMode }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorMode(e.target.checked ? 'dark' : 'light')
  }

  return (
    <ContentSection justifyContent="flex-start" alignItems="flex-start">
      <Stack gap={1} p={2}>
        <FormControlLabel
          control={<Switch checked={colorMode === 'dark'} onChange={handleChange} />}
          label="Tryb ciemny"
        />
      </Stack>
    </ContentSection>
  )
}

export default SettingsPage
