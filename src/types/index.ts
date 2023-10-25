export type StringOrNull = string | null

export type ApiResponse<T> = {
  success: boolean
  message?: string
  data?: T
}

export type ApiError = {
  message: string
}

export type ListResponse<T> = {
  count: number
  next: boolean
  previous: boolean
  results: T[]
}
