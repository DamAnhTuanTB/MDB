import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { ResetPasswordBody, ResetPasswordResponse } from '@/types/authentication'

import { useFetch } from '../use-fetch'

export const useCustomerResetPassword = () => {
  const { fetch, dataResult } = useFetch<ResetPasswordResponse, ResetPasswordBody>({ fetcher: customerApi.resetPassword })

  const [errorMessage, setErrorMessage] = useState<string[]>()

  useEffect(() => {
    if (dataResult?.error?.response?.data?.errors && dataResult?.error?.response?.data?.errors.length > 0) setErrorMessage(dataResult?.error?.response?.data?.errors?.map((item) => item.message))
    else setErrorMessage([dataResult?.error?.response?.data?.message || ''])
  }, [dataResult?.error])

  return {
    ...dataResult,
    errorMessage,
    fetch
  }
}
