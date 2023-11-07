import { accountApi } from '@/services/api/account'

import { AestheticProviderResponse } from '@/types/account/aesthetic-provider'

import { useFetch } from '../use-fetch'

export const useAccountAesthetic = () => {
  const { fetch: getAesthetic, dataResult: aesthetic } = useFetch<AestheticProviderResponse, undefined>({ fetcher: accountApi.getAestheticProvider })

  return {
    aesthetic,
    getAesthetic
  }
}
