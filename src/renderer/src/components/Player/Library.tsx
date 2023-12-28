import { ILibrary } from '@renderer/interfaces'
import { Alert } from '@mui/material'

interface Props {
  library: ILibrary[] | null
}

const Library = ({ library }: Props) => {
  if (library) {
    library.map(({ path }) => console.log(path))
  }
  return (
    <>
      {!library && <Alert severity="warning">Biblioteka jest pusta</Alert>}
      {library && <Alert severity="warning">cos tu jest</Alert>}
      {/* {library && library.map(({path}) => <div>{getFil}</div> )} */}
    </>
  )
}

export default Library
