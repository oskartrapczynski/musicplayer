const loadDb = async () => {
  return await window.api.readFileJSON()
}
export default loadDb
