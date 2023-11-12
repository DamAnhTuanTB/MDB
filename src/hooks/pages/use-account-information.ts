import { useEffect } from 'react'

import { accountApi } from '@/services/api/account'

import { useAuthStore } from '@/recoil/auth'
import { AccountInformation } from '@/types/account/information'

import { useFetch } from '../use-fetch'

export const useAccountInformation = () => {
  const { fetch: getProfile, dataResult: profile } = useFetch<AccountInformation>({ fetcher: accountApi.getProfile })

  const { fetch: updateProfile, dataResult: profileUpdated } = useFetch<AccountInformation>({ fetcher: accountApi.updateProfile })

  return {
    profile,
    profileUpdated,
    getProfile,
    updateProfile
  }
}
