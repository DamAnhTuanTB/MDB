import { StringOrNull } from '.'

export const settingIconKey = {
  logo: 'logo',
  favicon: 'favicon',
  bannerAutoScroll: 'banner_auto_scroll'
}

export enum ContentOptionKey {
  HOMEPAGE = 'HOMEPAGE',
  FEATURED_PRODUCT_TITLE = 'FEATURED_PRODUCT_TITLE'
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
  bannerAutoScroll: SettingItem
}

export type ContentOptions<T = Object> = {
  id: string
  group: string
  name: string
  value: StringOrNull
  jsonValue: T
  createdAt: string
  updatedAt: string
}

export type ContentOptionParams = {
  where?: {
    [key: string]: string
  }
}
