import { ListResponse } from '..'

export type AddressBody = {
  firstName: string
  lastName: string
  phone: string
  company?: string
  city: string
  stage: string
  country: string
  address: string
  zip: string
  isDefault?: boolean
}

export type AddressType = {
  id: string
  userId: string
  phone: string
  firstName: string
  lastName: string
  address: string
  city: string
  stage: string
  country: string
  zip: string
  company: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export type ListAddressResponse = ListResponse<AddressType>
