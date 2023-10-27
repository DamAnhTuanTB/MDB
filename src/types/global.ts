import { StringOrNull } from '.'

export const settingIconKey = {
  logo: 'logo',
  favicon: 'favicon',
  bannerAutoScroll: 'banner_auto_scroll'
}

export enum CONTENT_OPTIONS_KEY {
  HOMEPAGE = 'HOMEPAGE',
  FEATURED_PRODUCT_TITLE = 'FEATURED_PRODUCT_TITLE',
  FOOTER = 'FOOTER',
  SOCIAL_MEDIA_ICONS = 'SOCIAL_MEDIA_ICONS',
  FOOTER_MENU_ITEMS = 'FOOTER_MENU_ITEMS',
  FOOTER_DESCRIPTION = 'FOOTER_DESCRIPTION'
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
  createdAt: StringOrNull
  updatedAt: StringOrNull
}

export type ContentOptionParams = {
  where?: {
    [key: string]: string
  }
}
