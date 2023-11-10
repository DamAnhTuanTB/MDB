import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { authenticationConfig } from '@/configs/authentication'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useAuthStore } from '@/recoil/auth'
import { useFavoriteStore } from '@/recoil/favorite'
import { LoginBody, LoginResponse } from '@/types/authentication'
import { removeLocalStorage, setLocalStorage } from '@/utils/helper'

import { useFetch } from '../use-fetch'

export const useCustomerLogin = () => {
  const { setFavorites } = useFavoriteStore()
  const { fetch, dataResult } = useFetch<LoginResponse, LoginBody>({ fetcher: customerApi.login })
  const { setIsLoggedIn, setProfile, profile: profileStage } = useAuthStore()
  const [errorMessage, setErrorMessage] = useState<string>()
  const { getProfile, profile } = useAccountInformation()

  useEffect(() => {
    if (dataResult?.data) {
      setLocalStorage(authenticationConfig.accessToken, dataResult?.data?.accessToken)
      setLocalStorage(authenticationConfig.refreshToken, dataResult?.data?.refreshToken)
      getProfile(dataResult?.data?.accessToken)
    } else if (dataResult?.error) {
      setErrorMessage(dataResult?.error?.response?.data.message)
    }
  }, [dataResult?.data])

  useEffect(() => {
    if (profile?.data) {
      setIsLoggedIn(true)
      setProfile(profile.data)
    }
  }, [profile])

  const login = async (data: LoginBody) => {
    await fetch(data)
    setIsLoggedIn(true)
  }

  const logout = () => {
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
