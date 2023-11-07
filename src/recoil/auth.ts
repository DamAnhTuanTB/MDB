import { useMemo } from 'react'

import { parsePhoneNumber } from 'libphonenumber-js'
import { atom, useRecoilState } from 'recoil'

import { AccountInformation } from '@/types/account/information'

export const isLoggedInStage = atom<boolean>({
  key: 'isLoggedInStage',
  default: false
})

export const profileStage = atom<AccountInformation | undefined>({
  key: 'profileStage',
  default: undefined
})

export const useAuthStore = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInStage)
  const [profile, setProfile] = useRecoilState(profileStage)

  const phoneNumber = useMemo(() => (profile && profile.phone ? parsePhoneNumber(profile.phone) : undefined), [profile])

  return { isLoggedIn, setIsLoggedIn, profile, setProfile, phoneNumber }
}
