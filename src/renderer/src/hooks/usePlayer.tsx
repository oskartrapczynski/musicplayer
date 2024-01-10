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

  const toggle = (play: boolean) => {
    if (play === false) setIsPlaying(false)
    if (play === true) setIsPlaying(true)
  }
  const changeSongPos = (seek: number) => setSongPos(seek)
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

  audio.ontimeupdate = () => {
    setCurrentTime(audio.currentTime)
  }

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
  }, [songPos])

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
