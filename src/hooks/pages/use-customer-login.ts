import { useEffect, useState } from 'react'

import { customerApi } from '@/services/api/authentication'

import { authenticationConfig } from '@/configs/authentication'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCart } from '@/hooks/use-cart'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useAuthStore } from '@/recoil/auth'
import { useFavoriteStore } from '@/recoil/favorite'
import { LoginBody, LoginResponse } from '@/types/authentication'
import { removeLocalStorage, setLocalStorage } from '@/utils/helper'

import { useFetch } from '../use-fetch'

export const useCustomerLogin = () => {
  const { setFavorites } = useFavoriteStore()
  const { fetch, dataResult } = useFetch<LoginResponse, LoginBody>({ fetcher: customerApi.login })
  const { setIsLoggedIn, setProfile, isLoading, profile: profileStage, setIsLoading } = useAuthStore()
  const [errorMessage, setErrorMessage] = useState<string>()
  const { getProfile, profile } = useAccountInformation()
  const { push } = useRouterWithQueryParams()
  const { syncCartLocalToSever, dataSyncLocalToSever, getCart } = useCart()

  useEffect(() => {
    setErrorMessage(dataResult?.error?.response?.data.message)
  }, [dataResult?.error])

  useEffect(() => {
    if (dataSyncLocalToSever?.data) {
      removeLocalStorage('MDB_LIST_PRODUCT_CART')
      window.dispatchEvent(new Event('storage'))
      getCart()
    }
  }, [dataSyncLocalToSever])

  useEffect(() => {
    if (dataResult?.data) {
      setIsLoggedIn(true)
      setLocalStorage(authenticationConfig.accessToken, dataResult?.data?.accessToken)
      setLocalStorage(authenticationConfig.refreshToken, dataResult?.data?.refreshToken)
      getProfile(dataResult?.data?.accessToken)
      syncCartLocalToSever(dataResult?.data?.accessToken)
    } else if (dataResult?.error) {
      setErrorMessage(dataResult?.error?.response?.data.message)
      setIsLoading(false)
    }
  }, [dataResult])

  useEffect(() => {
    if (profile?.data) {
      setIsLoggedIn(true)
      setProfile(profile.data)
    } else if (profile?.error) {
      setIsLoading(false)
    }
  }, [profile])

  useEffect(() => {
    if (profileStage) {
      setIsLoading(false)
    }
  }, [profileStage])

  const login = async (data: LoginBody) => {
    setIsLoading(true)
    await fetch(data)
  }

  const loginPutBack = (urlBack: string) => {
    push({
      pathname: '/customer/login',
      query: {
        url: urlBack
      }
    })
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
    logout,
    loginPutBack
  }
}
