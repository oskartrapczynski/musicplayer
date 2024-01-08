export default interface IResponseFileJSON<T = unknown> {
  data: T | null
  info: string
}
