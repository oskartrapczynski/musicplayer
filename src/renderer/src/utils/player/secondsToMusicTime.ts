const secondsToMusicTime = (duration: number) => {
  const min = Math.floor(duration / 60)
  const sec = Math.floor(duration % 60)

  return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`
}

export default secondsToMusicTime
