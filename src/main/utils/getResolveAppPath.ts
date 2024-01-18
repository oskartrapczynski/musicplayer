import { is } from '@electron-toolkit/utils'
import { app } from 'electron'

const getResolveAppPath = (type?: '.' | 'userData' | 'none') => {
  switch (type) {
    case '.': {
      console.log('.')
      return '.'
    }
    case 'userData': {
      console.log('userData')
      return app.getPath('userData')
    }
    case 'none': {
      console.log('')
      return ''
    }
    default:
      console.log(is.dev ? '.' : app.getPath('userData'))
      return is.dev ? '.' : app.getPath('userData')
  }
}
export default getResolveAppPath
