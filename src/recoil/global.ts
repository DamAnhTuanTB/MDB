import { atom, useRecoilState } from 'recoil'

import { GlobalSetting } from '@/types/global'

export const globalSettingState = atom<GlobalSetting>({
  key: 'globalSettingState',
  default: undefined
})

export const useGlobalSettingStore = () => {
  const [globalSettingStore, setGlobalSettingStore] = useRecoilState(globalSettingState)

  return {
    globalSettingStore,
    setGlobalSettingStore
  }
}
