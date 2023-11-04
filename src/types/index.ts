import { AxiosError } from 'axios'

export type StringOrNull = string | null

export type DataError = {
  key: string
  label: string
  message: string
}

export type RequestError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
  errors?: DataError[]
}

export type ApiError<T = RequestError, D = any> = AxiosError<T, D>

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
