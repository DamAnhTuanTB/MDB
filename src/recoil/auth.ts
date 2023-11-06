import { atom, useRecoilState } from 'recoil'

import { AccountInformation } from '@/types/account/information'

export const profileAtom = atom<AccountInformation | null>({
  key: 'profile',
  default: null
})

export const useAuthStore = () => {
  const [profile, setProfile] = useRecoilState(profileAtom)

  return {
    profile,
    setProfile
  }
}
