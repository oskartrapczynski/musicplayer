import NodeID3 from 'node-id3'
const readAudioTags = (data: Buffer) => NodeID3.read(data)
export default readAudioTags
