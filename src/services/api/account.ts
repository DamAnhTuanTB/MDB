import { authenticationConfig } from '@/configs/authentication'
import { AddressBody, AddressType, ListAddressResponse, UpdateAddressParams } from '@/types/account/address'
import { AestheticProviderResponse } from '@/types/account/aesthetic-provider'
import { AccountInformation } from '@/types/account/information'
import { getLocalStorage } from '@/utils/helper'

import { apiBase } from '.'

const accessToken = getLocalStorage(authenticationConfig.accessToken)

export const accountApi = {
  getProfile() {
    return apiBase.get<AccountInformation>('/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  updateProfile(body: Partial<AccountInformation>) {
    return apiBase.put<Partial<AccountInformation>, AccountInformation>('/users/me', body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getAddressList() {
    return apiBase.get<ListAddressResponse>('/addresses', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  updateAddress({ body, id }: UpdateAddressParams) {
    return apiBase.put<Partial<AddressBody>, AddressType>(`/addresses/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  deleteAddress({ id }: { id: string }) {
    return apiBase.delete<AddressType>(`/addresses/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  },
  getAestheticProvider() {
    return apiBase.get<AestheticProviderResponse>('/aesthetics', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
