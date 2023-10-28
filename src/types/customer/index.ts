export type SignUpBody = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  allowPromotions?: boolean
}

export type SignUpResponse = {}
