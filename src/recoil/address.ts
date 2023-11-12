import { atom, useRecoilState } from 'recoil'

import { AddressType } from '@/types/account/address'

export const addressState = atom<AddressType[]>({
  key: 'addressState',
  default: []
})

export const useAddressStore = () => {
  const [addresses, setAddresses] = useRecoilState(addressState)

  return {
    addresses,
    setAddresses
  }
}
