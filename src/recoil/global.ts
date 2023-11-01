import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

import { GlobalSetting } from '@/types/global'
import { ProductCategory } from '@/types/product/category'

export const globalSettingState = atom<GlobalSetting>({
  key: 'globalSettingState',
  default: {} as GlobalSetting
})

export const bannerAutoScrollSelector = selector<boolean>({
  key: 'bannerAutoScrollSelector',
  get: ({ get }) => {
    const settings = get(globalSettingState)
    return settings?.bannerAutoScroll?.value === 'true'
  }
})

export const menuCategorieStage = atom<ProductCategory[]>({
  key: 'menuCategorieStage',
  default: []
})

export const useGlobalSettingStore = () => {
  const [globalSettingStore, setGlobalSettingStore] = useRecoilState(globalSettingState)
  const isBannerAutoScroll = useRecoilValue(bannerAutoScrollSelector)
  const [menuCategories, SetMenuCategories] = useRecoilState(menuCategorieStage)

  return {
    isBannerAutoScroll,
    globalSettingStore,
    setGlobalSettingStore,
    menuCategories,
    SetMenuCategories
  }
}
