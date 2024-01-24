import { IMusicResponse } from '@global/interfaces'
import { ContentSection, PlayerPro } from '@renderer/components'

interface Props {
  player1: IMusicResponse & {
    locationSong: string | undefined
  }
  duration1: null | number
  volume1: number
  changeSongVolume1: (volume: number) => void
  isDisabled1: boolean
  isPlaying1: boolean
  currentTime1: number
  changeSongPos1: (seek: number) => void
  toggle1: (play: boolean) => void
}

const PlayerProPage = ({
  player1,
  duration1,
  volume1,
  changeSongVolume1,
  isDisabled1,
  isPlaying1,
  currentTime1,
  changeSongPos1,
  toggle1
}: Props) => {
  return (
    <ContentSection>
      <PlayerPro
        player={player1}
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
