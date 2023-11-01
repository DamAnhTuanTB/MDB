import { atom, useRecoilState } from 'recoil'

import { ContentOption } from '@/types/global'

export const homeContentState = atom<ContentOption[]>({
  key: 'homeContentState',
  default: []
})

export const useHomeStore = () => {
  const [homeContent, setHomeContent] = useRecoilState(homeContentState)

  return {
    homeContent,
    setHomeContent
  }
}
