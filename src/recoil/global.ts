import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

import { GlobalSetting } from '@/types/global'

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

export const useGlobalSettingStore = () => {
  const [globalSettingStore, setGlobalSettingStore] = useRecoilState(globalSettingState)
  const isBannerAutoScroll = useRecoilValue(bannerAutoScrollSelector)

  return {
    isBannerAutoScroll,
    globalSettingStore,
    setGlobalSettingStore
  }
}
