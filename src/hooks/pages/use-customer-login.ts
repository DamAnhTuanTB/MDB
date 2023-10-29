import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { authenticationConfig } from '@/configs/authentication'
import { LoginBody, LoginError, LoginResponse } from '@/types/authentication'
import { removeLocalStorage, setLocalStorage } from '@/utils/helper'

import { useFetch } from '../use-fetch'

export const useCustomerLogin = () => {
  const { fetch, pageDataResult } = useFetch<LoginResponse, LoginBody, LoginError>({ fetcher: customerApi.login })

  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setErrorMessage(pageDataResult?.error?.response?.data.message)
  }, [pageDataResult?.error])

  useEffect(() => {
    if (pageDataResult?.data) {
      setLocalStorage(authenticationConfig.accessToken, pageDataResult?.data?.accessToken)
      setLocalStorage(authenticationConfig.refreshToken, pageDataResult?.data?.refreshToken)
    }
  }, [pageDataResult?.data])

  const login = async (data: LoginBody) => {
    await fetch(data)
  }

  const logout = async () => {
    removeLocalStorage(authenticationConfig.accessToken)
    removeLocalStorage(authenticationConfig.refreshToken)
  }

  return {
    ...pageDataResult,
    errorMessage,
    login,
    logout
  }
}
