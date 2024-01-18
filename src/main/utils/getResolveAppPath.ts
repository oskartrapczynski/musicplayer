import { is } from '@electron-toolkit/utils'
import { app } from 'electron'

const getResolveAppPath = (type?: '.' | 'userData' | 'none') => {
  switch (type) {
    case '.':
      return '.'

    case 'userData':
      return app.getPath('userData')

    case 'none':
      return ''

    default:
      return is.dev ? '.' : app.getPath('userData')
  }
}
export default getResolveAppPath
