import { SettingItem } from '@/types/global'

import { apiBase } from '.'

export const globalApi = {
  getSettings() {
    return apiBase.get<SettingItem[]>('/settings')
  },

  getSingleSetting(key: string) {
    return apiBase.get<SettingItem>(`/settings/${key}`)
  }
}
