import { accountApi } from '@/services/api/account'

import { ListAddressResponse } from '@/types/account/address'

import { useFetch } from '../use-fetch'

export const useAccountAddress = () => {
  const { fetch: getAdressList, dataResult: addresses } = useFetch<ListAddressResponse, undefined>({ fetcher: accountApi.getAddressList })

  return {
    getAdressList,
    ...addresses
  }
}
