import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/customer'

import { ResetPasswordBody, ResetPasswordError, ResetPasswordResponse } from '@/types/customer'

import { useFetch } from '../use-fetch'

export const useCustomerResetPassword = () => {
  const { fetch, pageDataResult } = useFetch<ResetPasswordResponse, ResetPasswordBody, ResetPasswordError>({ fetcher: customerApi.resetPassword })

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
