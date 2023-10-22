import { ListBannerResponse } from '@/types/home/banner'

import { apiBase } from '.'

export const homeApi = {
  getBanners() {
    return apiBase.get<ListBannerResponse>('/banners?noPagination=true')
  }
}
