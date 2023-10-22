import { ListResponse } from '..'

export type Banner = {
  id: string
  title: string
  status: string
  description: string
  imageKey: string
  imageUrl: string
  redirectUrl: string
  redirectButton: string
  ordering: number
  createdAt: string
  updatedAt: string
}

export type ListBannerResponse = ListResponse<Banner>
