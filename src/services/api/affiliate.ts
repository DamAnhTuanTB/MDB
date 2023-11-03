import { AffiliateType } from '@/types/affiliate'

import { apiBase } from '.'

export const affiliateApi = {
  getAffiliate(slug: string) {
    return apiBase.get<AffiliateType>(`/affiliates/${slug}`)
  }
}
