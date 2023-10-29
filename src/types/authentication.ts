// Sign up
export type SignUpBody = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  allowPromotions?: boolean
}

export type SignUpResponse = {
  accessToken: string
  refreshToken: string
}

export type SignUpError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
}

// Login
export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
}

// Forgot password
export type ForgotPasswordBody = {
  email: string
}

export type ForgotPasswordResponse = {}

export type ForgotPasswordError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
}

// Reset password
export type ResetPasswordBody = {
  password: string
  code: string
}

export type ResetPasswordResponse = {}

export type ResetPasswordError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
}
