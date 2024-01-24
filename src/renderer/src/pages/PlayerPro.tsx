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
}

const PlayerProPage = ({ player1, duration1, volume1, changeSongVolume1, isDisabled1 }: Props) => {
  return (
    <ContentSection>
      <PlayerPro
        player={player1}
        duration={duration1}
        text="Odtwarzacz 1"
        volume={volume1}
        changeSongVolume={changeSongVolume1}
        isDisabled={isDisabled1}
      />
    </ContentSection>
  )
}

export default PlayerProPage
