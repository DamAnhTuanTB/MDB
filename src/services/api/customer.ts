import { ForgotPasswordBody, ForgotPasswordResponse, LoginBody, LoginResponse, ResetPasswordBody, ResetPasswordResponse, SignUpBody, SignUpResponse } from '@/types/customer'

import { apiBase } from '.'

export const customerApi = {
  signup(body: SignUpBody) {
    return apiBase.post<SignUpBody, SignUpResponse>('/general/auth/register', body)
  },
  login(body: LoginBody) {
    return apiBase.post<LoginBody, LoginResponse>('/general/auth/login', body)
  },
  forgotPassword(body: ForgotPasswordBody) {
    return apiBase.post<ForgotPasswordBody, ForgotPasswordResponse>('/general/auth/forgot-password', body)
  },
  resetPassword(body: ResetPasswordBody) {
    return apiBase.post<ResetPasswordBody, ResetPasswordResponse>('/general/auth/reset-password', body)
  }
}
