export default interface INodeID3Image {
  mime: string
  type: {
    id: number
    name?: string
  }
  description: string
  imageBuffer: Buffer
}
