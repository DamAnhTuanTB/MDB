import { ForgotPasswordBody, ForgotPasswordResponse, LoginBody, LoginResponse, ResetPasswordBody, ResetPasswordResponse, SignUpBody, SignUpResponse } from '@/types/authentication'

import { apiBase } from '.'

export const customerApi = {
  signup(body: SignUpBody) {
    return apiBase.post<SignUpBody, SignUpResponse>('/auth/register', body)
  },
  login(body: LoginBody) {
    return apiBase.post<LoginBody, LoginResponse>('/auth/login', body)
  },
  forgotPassword(body: ForgotPasswordBody) {
    return apiBase.post<ForgotPasswordBody, ForgotPasswordResponse>('/auth/forgot-password', body)
  },
  resetPassword(body: ResetPasswordBody) {
    return apiBase.post<ResetPasswordBody, ResetPasswordResponse>('/auth/reset-password', body)
  }
}
