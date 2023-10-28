import { SignUpBody, SignUpResponse } from '@/types/customer/index'

import { apiBase } from '.'

export const customerApi = {
  signup(body: SignUpBody) {
    return apiBase.post<SignUpBody, SignUpResponse>('/general/auth/register', body)
  }
}
