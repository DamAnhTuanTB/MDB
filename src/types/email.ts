export type VerifyEmailBody = {
  email: string
  code: string
}

export type VerifyEmailRespones = {}
export type VerifyEmailError = {
  message?: string
  messageCode?: string
  error?: string
  path?: string
}
