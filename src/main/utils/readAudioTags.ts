import NodeID3 from 'node-id3'
import { getFileName } from '.'
const readAudioTags = (data: Buffer, path: string) => {
  const tags = NodeID3.read(data)
  if (!tags.artist || !tags.title) {
    const fileName = getFileName(path)
    const splitedFileName = fileName.split('-').map((item) => item.trim())
    const artist = splitedFileName[0]
    const title = splitedFileName.splice(1).join(' ')
    tags.title = tags.title ? tags.title : title
    tags.artist = tags.artist ? tags.artist : artist
  }
  return tags
}
export default readAudioTags
