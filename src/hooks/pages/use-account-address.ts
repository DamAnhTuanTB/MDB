import { useEffect } from 'react'

import { accountApi } from '@/services/api/account'

import { useAddressStore } from '@/recoil/address'
import { AddressBody, AddressType, ListAddressResponse, UpdateAddressParams } from '@/types/account/address'

import { useFetch } from '../use-fetch'

export const useAccountAddress = () => {
  const { fetch: getAddressList, dataResult: addresses } = useFetch<ListAddressResponse, undefined>({ fetcher: accountApi.getAddressList })

  const { fetch: addAddress, dataResult: addData } = useFetch<AddressType, AddressBody>({ fetcher: accountApi.addAddressList })

  const { fetch: updateAddress, dataResult: updateData } = useFetch<AddressType, UpdateAddressParams>({ fetcher: accountApi.updateAddress })

  const { fetch: deleteAddress, dataResult: deleteData } = useFetch<AddressType, { id: string }>({ fetcher: accountApi.deleteAddress })

  const { setAddresses, addresses: addressesStore } = useAddressStore()

  useEffect(() => {
    if (addresses?.data) setAddresses(addresses.data?.results || [])
    else if (addresses?.error) setAddresses([])
  }, [addresses])

  return {
    addresses,
    getAddressList,
    addData,
    addAddress,
    updateData,
    updateAddress,
    deleteData,
    deleteAddress
  }
}
