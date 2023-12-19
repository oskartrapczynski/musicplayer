const getAudioMime = (extension: string | undefined) => {
  if (extension === 'mp3') return 'audio/mpeg'
  if (extension === 'wav') return 'audio/wav'
  return undefined
}

export default getAudioMime
