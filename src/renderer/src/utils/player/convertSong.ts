import getAudioMime from './getAudioMime'

const convertBufferToSong = (data: Buffer, extension: string) => {
  const mime = getAudioMime(extension)
  if (!mime) return undefined
  const blob = new Blob([data], { type: mime })
  return URL.createObjectURL(blob)
}
export default convertBufferToSong
