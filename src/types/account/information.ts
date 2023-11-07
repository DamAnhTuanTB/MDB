import { StringOrNull } from '..'

export type AccountInformation = {
  id: string
  email: StringOrNull
  firstName: StringOrNull
  lastName: StringOrNull
  phone: StringOrNull
  status: string
  allowPromotions: boolean
  isEmailVerified: boolean
  aestheticProvider?: AccountInformation
}
