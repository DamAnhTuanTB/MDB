import { StringOrNull } from '..'

export type AestheticOrganization = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: StringOrNull
}

export type AestheticAffiliateProfile = {
  userId: string
  commission: number
  organizationId: string
  domain: string
  createdBy: string
  updatedBy: StringOrNull
  deletedBy: StringOrNull
  organization: AestheticOrganization
}

export type AestheticProvider = {
  id: string
  email: string
  phone: string
  firstName: string
  lastName: string
  aestheticProvider: AestheticAffiliateProfile
}

export type AestheticProviderResponse = {
  aestheticProvider: AestheticProvider
}
