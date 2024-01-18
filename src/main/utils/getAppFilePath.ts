import { is } from '@electron-toolkit/utils'
import { app } from 'electron'

const getAppFilePath = () => (is.dev ? '.' : `${app.getPath('userData')}`)

export default getAppFilePath
