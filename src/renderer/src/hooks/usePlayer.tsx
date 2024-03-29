import { useMemo, useEffect, useState } from 'react'

interface Props {
  audioObj: HTMLAudioElement
  src: string | undefined
}

const usePlayer = ({ audioObj, src }: Props) => {
  const audio = useMemo(() => audioObj, [])
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState<null | number>(null)
  const [songPos, setSongPos] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(100)
  const [reloadSongPos, setReloadSongPos] = useState(false)

  const toggle = (play: boolean) => {
    if (play === false) setIsPlaying(false)
    if (play === true) setIsPlaying(true)
  }
  const changeSongPos = (seek: number) => {
    setSongPos(seek)
    setReloadSongPos((prev) => !prev)
  }
  const changeSongVolume = (volume: number) => setVolume(volume)

  if (src && audio.src !== src) {
    setIsPlaying(false)
    changeSongPos(0)
    URL.revokeObjectURL(audio.src)
    audio.src = src
  }

  audio.volume = Number(volume / 100)

  audio.preload = 'metadata'
  audio.onloadedmetadata = () => {
    setDuration(audio.duration)
  }

  // audio.ontimeupdate = () => {
  //   setCurrentTime(Math.round(audio.currentTime * 10) / 10)
  // }
  useEffect(() => {
    // if(!isPlaying) return
    const intervalId = setInterval(
      () => setCurrentTime(Math.round(audio.currentTime * 10) / 10),
      100
    )
    return () => clearInterval(intervalId)
  }, [])

  audio.onended = () => {
    toggle(false)
    changeSongPos(0)
  }

  // sprawdzic przy zmianie normal vs pro
  // useEffect(() => {
  //   return () => URL.revokeObjectURL(audio.src)
  // }, [])

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause()
  }, [isPlaying])

  useEffect(() => {
    audio.currentTime = songPos
  }, [songPos, reloadSongPos])

  return {
    isPlaying,
    toggle,
    duration,
    changeSongPos,
    songPos,
    currentTime,
    volume,
    changeSongVolume
  } as const
}

export default usePlayer
