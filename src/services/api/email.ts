import { VerifyEmailBody, VerifyEmailRespones } from '@/types/email'

import { apiBase } from '.'

export const emailApi = {
  verify(body: VerifyEmailBody) {
    return apiBase.post<VerifyEmailBody, VerifyEmailRespones>('/', body)
  }
}
