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

export type Address = {
  country: string
  firstName: string
  lastName: string
  company: string
  address: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
}

export type AddData = {
  key: string
  label: string
  value: StringOrNull | boolean
}

export type ConfirmData = {
  key: string
  label: string
  subLabel: string
  value: StringOrNull | boolean
}
