// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { PlayerBasic } from './components'

const App = () => {
  // const [src, setSrc] = useState<null | string>(null)

  // const handleOpen = async () => {
  //   setSrc(await openDialogMusicFile())
  // }

  // const handleOpenDb = async () => {
  //   const db = await loadDb()
  //   console.log(db)
  // }

  return (
    <>
      <PlayerBasic />

      {/* <SideMenuApp /> */}
    </>
  )
}

export default App
