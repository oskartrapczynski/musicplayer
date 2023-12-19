import musicResponse from '../global/musicResponse'

export default interface CustomAPIs {
  openMusic: () => Promise<musicResponse>
  readFileJSON: () => Promise<JSON>
}
