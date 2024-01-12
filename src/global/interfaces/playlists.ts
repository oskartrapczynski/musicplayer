export default interface IPlaylist {
  playlistId: string
  name: string
  songs: { songId: string }[]
}
