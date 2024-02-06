import { IDB, ILibrary, IPlaylist, IResponseFileJSON } from '@global/interfaces'
import { Button, FormControlLabel, Stack, Switch } from '@mui/material'
import { ContentSection } from '@renderer/components'
import { FUNCTIONS } from '@global/constants'

interface Props {
  colorMode: 'light' | 'dark'
  setColorMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
  library: ILibrary[] | null
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[] | null>>
  playlists: IPlaylist[] | null
  setPlaylists: React.Dispatch<React.SetStateAction<IPlaylist[] | null>>
}

const SettingsPage = ({
  colorMode,
  setColorMode,
  library,
  setLibrary,
  playlists,
  setPlaylists
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColorMode(e.target.checked ? 'dark' : 'light')
  }

  const handleExportFile = () => {
    if (!library || !playlists) return
    window.electron.ipcRenderer.invoke(FUNCTIONS.EXPORT_DIALOG_JSON, {
      library: [...library],
      playlists: [...playlists]
    })
  }

  const handleImportFile = async () => {
    try {
      const { data }: IResponseFileJSON = await window.electron.ipcRenderer.invoke(
        FUNCTIONS.IMPORT_DIALOG_JSON
      )
      const db = data as IDB
      console.log(db)
      setLibrary(db && db?.library?.length > 0 ? db.library : [])
      setPlaylists(db && db?.playlists?.length > 0 ? db.playlists : [])
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  return (
    <ContentSection justifyContent="flex-start" alignItems="flex-start">
      <Stack gap={1} p={2}>
        <FormControlLabel
          control={<Switch checked={colorMode === 'dark'} onChange={handleChange} />}
          label="Tryb ciemny"
        />
        <Button variant="contained" onClick={handleImportFile}>
          Importuj bazę z muzyką
        </Button>
        <Button variant="contained" onClick={handleExportFile}>
          Eksportuj bazę z muzyką
        </Button>
      </Stack>
    </ContentSection>
  )
}

export default SettingsPage
