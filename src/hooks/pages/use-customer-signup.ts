import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/customer'

import { SignUpBody, SignUpResponse } from '@/types/customer'

import { useFetch } from '../use-fetch'

export const useCustomerSignUp = () => {
  const { fetch, pageDataResult } = useFetch<SignUpResponse, SignUpBody>({ fetcher: customerApi.signup })

  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setErrorMessage(pageDataResult?.error?.response?.data.message)
  }, [pageDataResult?.error])

  return {
    ...pageDataResult,
    errorMessage,
    fetch
  }
}
