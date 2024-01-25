import { IMusicResponse } from '@global/interfaces'

type Player = IMusicResponse & { locationSong: string | undefined }

export default Player
