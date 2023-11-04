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

// Login
export type LoginBody = {
  email: string
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}

// Forgot password
export type ForgotPasswordBody = {
  email: string
}

export type ForgotPasswordResponse = {}

// Reset password
export type ResetPasswordBody = {
  password: string
  code: string
  email: string
}

export type ResetPasswordResponse = {}
