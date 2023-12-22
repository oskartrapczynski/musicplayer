import MusicResponse from '../global/musicResponse'

export default interface CustomAPIs {
  openMusic: () => Promise<MusicResponse>
  readFileJSON: () => Promise<JSON>
}
