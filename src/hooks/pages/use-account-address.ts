import { accountApi } from '@/services/api/account'

import { AddressType, ListAddressResponse, UpdateAddressParams } from '@/types/account/address'

import { useFetch } from '../use-fetch'

export const useAccountAddress = () => {
  const { fetch: getAdressList, dataResult: addresses } = useFetch<ListAddressResponse, undefined>({ fetcher: accountApi.getAddressList })

  const { fetch: updateAddress, dataResult: updateData } = useFetch<AddressType, UpdateAddressParams>({ fetcher: accountApi.updateAddress })

  const { fetch: deleteAddress, dataResult: deleteData } = useFetch<AddressType, { id: string }>({ fetcher: accountApi.deleteAddress })

  return {
    addresses,
    getAdressList,
    updateData,
    updateAddress,
    deleteData,
    deleteAddress
  }
}
