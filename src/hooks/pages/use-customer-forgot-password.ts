import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { ForgotPasswordBody, ForgotPasswordError, ForgotPasswordResponse } from '@/types/authentication'

import { useFetch } from '../use-fetch'

export const useCustomerForgotPassword = () => {
  const { fetch, pageDataResult } = useFetch<ForgotPasswordResponse, ForgotPasswordBody, ForgotPasswordError>({ fetcher: customerApi.forgotPassword })

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
