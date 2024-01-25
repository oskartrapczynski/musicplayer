import { ILibrary, IMusicResponse } from '@global/interfaces'
import { ContentSection, PlayerPro } from '@renderer/components'
import { HotCue } from '@renderer/interfaces'

interface Props {
  library: ILibrary[] | null
  setLibrary: React.Dispatch<React.SetStateAction<ILibrary[] | null>>
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  setPlayer1: React.Dispatch<
    React.SetStateAction<
      IMusicResponse & {
        locationSong: string | undefined
      }
    >
  >
  duration1: null | number
  volume1: number
  changeSongVolume1: (volume: number) => void
  isDisabled1: boolean
  isPlaying1: boolean
  currentTime1: number
  changeSongPos1: (seek: number) => void
  toggle1: (play: boolean) => void
  hotCues1: HotCue
}

const PlayerProPage = ({
  library,
  setLibrary,
  player1,
  setPlayer1,
  duration1,
  volume1,
  changeSongVolume1,
  isDisabled1,
  isPlaying1,
  currentTime1,
  changeSongPos1,
  toggle1,
  hotCues1
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
        isDisabled={isDisabled1}
        isPlaying={isPlaying1}
        currentTime={currentTime1}
        changeSongPos={changeSongPos1}
        toggle={toggle1}
      />
      {/* <PlayerPro 2 */}
    </ContentSection>
  )
}

export default PlayerProPage
