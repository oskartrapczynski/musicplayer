import { INodeID3Image } from '@renderer/interfaces'
import NodeID3 from 'node-id3'
import { convertBufferToImage } from '..'

const createMusicCover = (songTags: NodeID3.Tags | undefined) => {
  return songTags &&
    (songTags.image as INodeID3Image) &&
    (songTags.image as INodeID3Image).imageBuffer &&
    (songTags.image as INodeID3Image).mime
    ? convertBufferToImage(
        (songTags.image as INodeID3Image).imageBuffer,
        (songTags.image as INodeID3Image).mime
      )
    : null
}

export default createMusicCover
