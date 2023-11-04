import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { ForgotPasswordBody, ForgotPasswordResponse } from '@/types/authentication'

import { useFetch } from '../use-fetch'

export const useCustomerForgotPassword = () => {
  const { fetch, dataResult } = useFetch<ForgotPasswordResponse, ForgotPasswordBody>({ fetcher: customerApi.forgotPassword })

  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setErrorMessage(dataResult?.error?.response?.data.message)
  }, [dataResult?.error])

  return {
    ...dataResult,
    errorMessage,
    fetch
  }
}
