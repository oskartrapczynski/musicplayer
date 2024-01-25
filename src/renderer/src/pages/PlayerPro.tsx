import { ILibrary } from '@global/interfaces'
import { ContentSection, PlayerPro } from '@renderer/components'
import { Player } from '@renderer/interfaces'

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
      />
    </ContentSection>
  )
}

export default PlayerProPage
