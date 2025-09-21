export interface IApiResponse<T> {
  headers: any
  success: boolean
  data: T | null
  error?: string
  status?: number
}
