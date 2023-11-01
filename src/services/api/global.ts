import qs from 'qs'

import { ContentOption, ContentOptionParams, SettingItem } from '@/types/global'

import { apiBase } from '.'

export const globalApi = {
  getSettings() {
    return apiBase.get<SettingItem[]>('/settings')
  },

  getSingleSetting(key: string) {
    return apiBase.get<SettingItem>(`/settings/${key}`)
  },

  getContentOptions(params: ContentOptionParams) {
    const queryString = qs.stringify(params)
    return apiBase.get<ContentOption[]>(`/options?${queryString}`)
  }
}
