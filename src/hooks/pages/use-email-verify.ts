import { useEffect, useState } from 'react'

import { emailApi } from '@/services/api/email'

import { VerifyEmailBody, VerifyEmailError, VerifyEmailRespones } from '@/types/email'

import { useFetch } from '../use-fetch'

export const useEmailVerify = () => {
  const { fetch, pageDataResult } = useFetch<VerifyEmailRespones, VerifyEmailBody, VerifyEmailError>({ fetcher: emailApi.verify })

  const [errorMessage, setErrorMessage] = useState<string>()
  const [successMessage, setSuccessMessage] = useState<string>()

  useEffect(() => {
    if (pageDataResult?.error) setErrorMessage(pageDataResult?.error?.response?.data.message)
  }, [pageDataResult?.error])

  useEffect(() => {
    if (pageDataResult?.data) setSuccessMessage('Your email address has been successfully verified!')
  }, [pageDataResult?.data])

  return {
    ...pageDataResult,
    errorMessage,
    successMessage,
    fetch
  }
}
