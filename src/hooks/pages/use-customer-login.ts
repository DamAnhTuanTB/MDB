import { customerApi } from '@/services/api/customer'

import { LoginBody, LoginError, LoginResponse } from '@/types/customer'

import { useFetch } from '../use-fetch'

export const useCustomerLogin = () => {
  const { fetch, pageDataResult } = useFetch<LoginResponse, LoginBody, LoginError>({ fetcher: customerApi.login })

  return {
    ...pageDataResult,
    fetch
  }
}
