import { customerApi } from '@/services/api/customer'

import { SignUpBody, SignUpResponse } from '@/types/customer'

import { useFetch } from '../use-fetch'

export const useCustomerSignUp = () => {
  const { fetch, data, isLoading, error } = useFetch<SignUpResponse, SignUpBody>({ fetcher: customerApi.signup })

  return {
    isLoading,
    error,
    data,
    fetch
  }
}
