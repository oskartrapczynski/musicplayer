import { useMemo, useEffect, useState } from 'react'

const usePlayer = (src: string | undefined) => {
  const audio = useMemo(() => new Audio(src), [src])
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState<null | number>(null)
  const [songPos, setSongPos] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const toggle = () => setIsPlaying(!isPlaying)

  const changeSongPos = (seek: number) => setSongPos(seek)

  audio.preload = 'metadata'
  audio.onloadedmetadata = () => {
    setDuration(audio.duration)
  }

  audio.ontimeupdate = () => {
    setCurrentTime(audio.currentTime)
  }

  // wsadzic timeout i zmieniac zwracac wartosc seek co sekunde

  // useEffect(() => {
  //   const idTimeout = setInterval(() => {
  //     console.log(audio.currentTime)
  //   }, 1000)
  //   return (): void => {
  //     clearInterval(idTimeout)
  //   }
  // }, [])

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause()
  }, [isPlaying])

  useEffect(() => {
    audio.currentTime = songPos
    // setCurrentTime(songPos)
  }, [songPos])

  // useEffect(() => {
  //   audio.addEventListener('ended', () => setIsPlaying(false))
  //   return (): void => {
  //     audio.removeEventListener('ended', () => setIsPlaying(false))
  //   }
  // }, [])

  return { isPlaying, toggle, duration, changeSongPos, songPos, currentTime } as const
}

export default usePlayer
