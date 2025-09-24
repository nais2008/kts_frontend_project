export interface IApiResponse<T> {
  success: boolean
  data: T | null
  error?: string
  status?: number
}
