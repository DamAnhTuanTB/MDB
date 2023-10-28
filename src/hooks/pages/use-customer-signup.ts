import { customerApi } from '@/services/api/customer'

import { SignUpBody, SignUpResponse } from '@/types/customer'

import { useFetch } from '../use-fetch'

export const useCustomerSignUp = () => {
  const { fetch, pageDataResult } = useFetch<SignUpResponse, SignUpBody>({ fetcher: customerApi.signup })

  return {
    ...pageDataResult,
    fetch
  }
}
