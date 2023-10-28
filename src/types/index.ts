import { AxiosError } from 'axios'

export type StringOrNull = string | null

export type ApiError<T = unknown, D = any> = AxiosError<T, D>

export type ListResponse<T> = {
  count: number
  next: boolean
  previous: boolean
  results: T[]
}

export type MDBResult<T = unknown, E = unknown> = {
  isLoading: boolean
  data?: T
  error?: ApiError<E>
}
