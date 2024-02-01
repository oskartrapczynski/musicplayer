import { ILibrary } from '@global/interfaces'
import { ContentSection, PlayerPro } from '@renderer/components'
import { PLAYER } from '@renderer/constants'
import { IMixVolumes, Player } from '@renderer/interfaces'
import { useEffect, useState } from 'react'

interface Props {
  library: ILibrary[] | null
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[] | null>>
  player1: Player
  setPlayer1: React.Dispatch<React.SetStateAction<Player>>
  duration1: null | number
  volume1: number
  changeSongVolume1: (volume: number) => void
  isPlaying1: boolean
  currentTime1: number
  changeSongPos1: (seek: number) => void
  toggle1: (play: boolean) => void
  player2: Player
  setPlayer2: React.Dispatch<React.SetStateAction<Player>>
  duration2: null | number
  volume2: number
  changeSongVolume2: (volume: number) => void
  isPlaying2: boolean
  currentTime2: number
  changeSongPos2: (seek: number) => void
  toggle2: (play: boolean) => void
}

const PlayerProPage = ({
  library,
  setLibrary,
  player1,
  setPlayer1,
  duration1,
  volume1,
  changeSongVolume1,
  isPlaying1,
  currentTime1,
  changeSongPos1,
  toggle1,
  player2,
  setPlayer2,
  duration2,
  volume2,
  changeSongVolume2,
  isPlaying2,
  currentTime2,
  changeSongPos2,
  toggle2
}: Props) => {
  const [mix, setMix] = useState<IMixVolumes>({ [PLAYER.one]: null, [PLAYER.two]: null })

  const resetMix = (playerId: PLAYER) => {
    setMix((prev) => ({ ...prev, [playerId]: null }))
  }

  const isReadyForMixing = (
    playerId: PLAYER,
    operator: number,
    volume: number,
    changeSongVolume: (volume: number) => void
  ) => {
    switch (mix[playerId]!.type) {
      case 'down': {
        if (volume === 0 && mix[playerId]!.value === 0) {
          resetMix(playerId)
          return false
        }
        if (mix[playerId]!.value - operator < 0) {
          setMix((prev) => ({ ...prev!, [playerId]: { ...prev[playerId]!, value: 0 } }))
          changeSongVolume(0)
          return false
        }
        return true
      }
      case 'up': {
        if (volume === 100 && mix[playerId]!.value === 100) {
          resetMix(playerId)
          return false
        }
        if (mix[playerId]!.value + operator > 100) {
          setMix((prev) => ({ ...prev!, [playerId]: { ...prev[playerId], value: 100 } }))
          changeSongVolume(100)
          return false
        }
        return true
      }
      default:
        return false
    }
  }

  const defineOperator = (type: 'down' | 'up', initValue: number) => {
    return type === 'down' ? initValue * 0.1 : (100 - initValue) * 0.1
  }

  useEffect(() => {
    if (!mix[PLAYER.one]) return
    const operator = defineOperator(mix[PLAYER.one]!.type, mix[PLAYER.one]!.initValue)
    if (!isReadyForMixing(PLAYER.one, operator, volume1, changeSongVolume1)) return
    volumeMix(PLAYER.one, operator, volume1, changeSongVolume1)
  }, [volume1, mix[PLAYER.one]])
  useEffect(() => {
    if (!mix[PLAYER.two]) return
    const operator = defineOperator(mix[PLAYER.two]!.type, mix[PLAYER.two]!.initValue)
    if (!isReadyForMixing(PLAYER.two, operator, volume2, changeSongVolume2)) return
    volumeMix(PLAYER.two, operator, volume2, changeSongVolume2)
  }, [volume2, mix[PLAYER.two]])

  const volumeMix = (
    playerId: PLAYER,
    operator: number,
    volume: number,
    changeSongVolume: (volume: number) => void
  ) => {
    const timeoutId = setTimeout(() => {
      const newTime = Math.round(
        mix[playerId]!.type === 'down'
          ? mix[playerId]!.value - operator
          : mix[playerId]!.value + operator
      )
      const newVolume = Math.round(
        mix[playerId]!.type === 'down' ? volume - operator : volume + operator
      )
      if (newTime !== newVolume) return resetMix(playerId)
      setMix((prev) => ({ ...prev!, [playerId]: { ...prev[playerId], value: newTime } }))
      changeSongVolume(newTime)
    }, 100)
    return () => clearTimeout(timeoutId)
  }

  const handleSetActivePlayerPlay = (playerId: PLAYER) => {
    setMix({
      [PLAYER.one]: {
        type: playerId === PLAYER.one ? 'up' : 'down',
        initValue: volume1,
        value: volume1
      },
      [PLAYER.two]: {
        type: playerId === PLAYER.one ? 'down' : 'up',
        initValue: volume2,
        value: volume2
      }
    })
  }

  return (
    <ContentSection>
      <PlayerPro
        library={library}
        setLibrary={setLibrary}
        player={player1}
        setPlayer={setPlayer1}
        duration={duration1}
        text="Odtwarzacz 1"
        volume={volume1}
        changeSongVolume={changeSongVolume1}
        isDisabled={!player1.song}
        isPlaying={isPlaying1}
        currentTime={currentTime1}
        changeSongPos={changeSongPos1}
        toggle={toggle1}
        playerId={PLAYER.one}
        handleSetActivePlayerPlay={handleSetActivePlayerPlay}
        mix={mix}
      />
      <PlayerPro
        library={library}
        setLibrary={setLibrary}
        player={player2}
        setPlayer={setPlayer2}
        duration={duration2}
        text="Odtwarzacz 2"
        volume={volume2}
        changeSongVolume={changeSongVolume2}
        isDisabled={!player2.song}
        isPlaying={isPlaying2}
        currentTime={currentTime2}
        changeSongPos={changeSongPos2}
        toggle={toggle2}
        playerId={PLAYER.two}
        handleSetActivePlayerPlay={handleSetActivePlayerPlay}
        mix={mix}
      />
    </ContentSection>
  )
}

export default PlayerProPage
