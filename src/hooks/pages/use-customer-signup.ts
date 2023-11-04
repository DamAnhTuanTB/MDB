import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { SignUpBody, SignUpResponse } from '@/types/authentication'

import { useFetch } from '../use-fetch'

export const useCustomerSignUp = () => {
  const { fetch, dataResult } = useFetch<SignUpResponse, SignUpBody>({ fetcher: customerApi.signup })

  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setErrorMessage(dataResult?.error?.response?.data?.message)
  }, [dataResult?.error])

  return {
    ...dataResult,
    errorMessage,
    fetch
  }
}
