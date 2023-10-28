export type SignUpBody = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  allowPromotions?: boolean
}

export type SignUpResponse = {}

export type SignUpError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
}

export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {}

export type LoginError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
}
