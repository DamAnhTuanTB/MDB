import qs from 'qs'

import { ContentItem, ContentOptionParams, ContentOptions } from '@/types/global'

import { apiBase } from '.'

export const globalApi = {
  getSettings() {
    return apiBase.get<ContentItem[]>('/settings')
  },

  getSingleSetting(key: string) {
    return apiBase.get<ContentItem>(`/settings/${key}`)
  },

  getContentOptions(params: ContentOptionParams) {
    const queryString = qs.stringify(params)
    return apiBase.get<ContentOptions[]>(`/options?${queryString}`)
  }
}
