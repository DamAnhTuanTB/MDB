import { useEffect, useState } from 'react'

import { emailApi } from '@/services/api/email'

import { VerifyEmailBody, VerifyEmailRespones } from '@/types/email'

import { useFetch } from '../use-fetch'

export const useEmailVerify = () => {
  const { fetch, dataResult } = useFetch<VerifyEmailRespones, VerifyEmailBody>({ fetcher: emailApi.verify })

  const [errorMessage, setErrorMessage] = useState<string>()
  const [successMessage, setSuccessMessage] = useState<string>()

  useEffect(() => {
    if (dataResult?.error) setErrorMessage(dataResult?.error?.response?.data?.message)
  }, [dataResult?.error])

  useEffect(() => {
    if (dataResult?.data) setSuccessMessage('Your email address has been successfully verified!')
  }, [dataResult?.data])

  return {
    ...dataResult,
    errorMessage,
    successMessage,
    verifyEmail: fetch
  }
}
