import { authenticationConfig } from '@/configs/authentication'
import { AccountInformation } from '@/types/account/information'
import { getLocalStorage } from '@/utils/helper'

import { apiBase } from '.'

const accessToken = getLocalStorage(authenticationConfig.accessToken)

export const accountInformationApi = {
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
  }
}
