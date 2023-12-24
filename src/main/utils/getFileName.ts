const getFileName = (path: string) => {
  if (path.indexOf('/') !== -1) {
    return path
      .slice(0, path.length - 4)
      .split('/')
      .pop()!
  } else {
    return path
      .slice(0, path.length - 4)
      .split('\\')
      .pop()!
  }
}

export default getFileName
