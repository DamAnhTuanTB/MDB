import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { authenticationConfig } from '@/configs/authentication'
import { useAuthStore } from '@/recoil/auth'
import { useFavoriteStore } from '@/recoil/favorite'
import { LoginBody, LoginResponse } from '@/types/authentication'
import { removeLocalStorage, setLocalStorage } from '@/utils/helper'

import { useFetch } from '../use-fetch'

export const useCustomerLogin = () => {
  const { setFavorites } = useFavoriteStore()
  const { setIsLoggedIn, setProfile } = useAuthStore()
  const { fetch, dataResult } = useFetch<LoginResponse, LoginBody>({ fetcher: customerApi.login })

  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setErrorMessage(dataResult?.error?.response?.data.message)
  }, [dataResult?.error])

  useEffect(() => {
    if (dataResult?.data) {
      setLocalStorage(authenticationConfig.accessToken, dataResult?.data?.accessToken)
      setLocalStorage(authenticationConfig.refreshToken, dataResult?.data?.refreshToken)
    }
  }, [dataResult?.data])

  const login = async (data: LoginBody) => {
    await fetch(data)
    setIsLoggedIn(true)
  }

  const logout = async () => {
    removeLocalStorage(authenticationConfig.accessToken)
    removeLocalStorage(authenticationConfig.refreshToken)
    setFavorites([])
    setIsLoggedIn(false)
    setProfile(undefined)
  }

  return {
    ...dataResult,
    errorMessage,
    login,
    logout
  }
}
