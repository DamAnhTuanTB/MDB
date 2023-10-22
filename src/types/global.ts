export const settingIconKey = {
  logo: 'logo',
  favicon: 'favicon',
  bannerAutoScroll: 'banner_auto_scroll'
}

export type Metadata = {}

export type SettingItem = {
  id: string
  key: string
  name: string
  value: string
  metadata: Metadata
}

export type GlobalSetting = {
  logo: SettingItem
  favicon: SettingItem
  bannerAutoScroll: boolean
}
