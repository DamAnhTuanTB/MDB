import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { authenticationConfig } from '@/configs/authentication'
import { LoginBody, LoginResponse } from '@/types/authentication'
import { removeLocalStorage, setLocalStorage } from '@/utils/helper'

import { useFetch } from '../use-fetch'
import { useAuthStore } from '@/recoil/auth'

export const useCustomerLogin = () => {
  const { fetch, dataResult } = useFetch<LoginResponse, LoginBody>({ fetcher: customerApi.login })

  const [errorMessage, setErrorMessage] = useState<string>()
  const { setIsLoggedIn } = useAuthStore()

  useEffect(() => {
    setErrorMessage(dataResult?.error?.response?.data.message)
  }, [dataResult?.error])

  useEffect(() => {
    if (dataResult?.data) {
      setIsLoggedIn(true)
      setLocalStorage(authenticationConfig.accessToken, dataResult?.data?.accessToken)
      setLocalStorage(authenticationConfig.refreshToken, dataResult?.data?.refreshToken)
    }
  }, [dataResult?.data])

  const login = async (data: LoginBody) => {
    await fetch(data)
  }

  const logout = async () => {
    removeLocalStorage(authenticationConfig.accessToken)
    removeLocalStorage(authenticationConfig.refreshToken)
  }

  return {
    ...dataResult,
    errorMessage,
    login,
    logout
  }
}
