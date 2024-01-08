import NodeID3 from 'node-id3'
const readAudioTags = (buffer: Buffer) => {
  return new Promise<NodeID3.Tags | undefined>((resolve) => {
    try {
      const tags = NodeID3.read(buffer)
      resolve(tags)
    } catch {
      resolve(undefined)
    }
  })
}
export default readAudioTags
