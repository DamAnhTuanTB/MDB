import { accountInformationApi } from '@/services/api/account'

import { AccountInformation } from '@/types/account/information'

import { useFetch } from '../use-fetch'

export const useAccountInformation = () => {
  const { fetch: getProfile, dataResult: profile } = useFetch<AccountInformation>({ fetcher: accountInformationApi.getProfile })

  const { fetch: updateProfile, dataResult: profileUpdated } = useFetch<Partial<AccountInformation>>({ fetcher: accountInformationApi.updateProfile })

  return {
    profile,
    profileUpdated,
    getProfile,
    updateProfile
  }
}
