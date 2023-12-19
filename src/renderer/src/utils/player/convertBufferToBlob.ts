const convertBufferToBlob = (data: Buffer, mime: string) => {
  return new Blob([data], { type: mime })
}
export default convertBufferToBlob
