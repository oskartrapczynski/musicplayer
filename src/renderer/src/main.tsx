import { CssBaseline } from '@mui/material'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('root') as HTMLElement

const root = createRoot(rootElement)
root.render(
  // <React.StrictMode>
  <>
    <CssBaseline />
    <App />
  </>

  // </React.StrictMode>
)
