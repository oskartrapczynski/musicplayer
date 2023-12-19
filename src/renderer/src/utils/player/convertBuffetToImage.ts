const convertBuffetToImage = (buffer: Buffer, mime: string = 'image/png') => {
  const blob = new Blob([buffer], { type: mime })
  return URL.createObjectURL(blob)
}
export default convertBuffetToImage
