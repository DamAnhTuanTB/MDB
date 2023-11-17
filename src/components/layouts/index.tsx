import React, { useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

import { authenticationConfig } from '@/configs/authentication'
import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useAuthStore } from '@/recoil/auth'
import { useFavoriteStore } from '@/recoil/favorite'
import { FooterContent } from '@/types/footer'
import { getLocalStorage } from '@/utils/helper'

import Footer from './footer'
import Header from './header'

type Props = {
  children: React.ReactNode
  footerContent: FooterContent[]
}

export default function Layout({ children, footerContent }: Props) {
  const { getProfile, profile } = useAccountInformation()
  const { logout } = useCustomerLogin()
  const { isLoggedIn, setIsLoggedIn, setProfile, isLoading, profile: profileStage, setIsLoading } = useAuthStore()
  const { getFavorite, data: favoriteProducts } = useAccountFavorite()
  const { setFavorites } = useFavoriteStore()
  const { pathname } = useRouter()
  const accessToken = useMemo(() => getLocalStorage(authenticationConfig.accessToken), [isLoggedIn])
  const pageNeedToken = ['/account/information', '/account/favorite']

  useEffect(() => {
    if (accessToken) {
      getProfile(undefined)
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // isLoading to block action when logout router pushBack => useFetch not reset data
    if (!profile?.isLoading && isLoading) {
      // if (!profile?.isLoading) {
      if (profile?.data) {
        setProfile(profile?.data)
        setIsLoggedIn(true)
      } else if (profile?.error) {
        setIsLoggedIn(false)
        setProfile(undefined)
        logout()
      }
    }
  }, [profile])

  useEffect(() => {
    if (profile?.data) setProfile(profile?.data)
  }, [profile])

  useEffect(() => {
    if (profileStage) {
      setIsLoading(false)
    }
  }, [profileStage])

  useEffect(() => {
    if (isLoggedIn) {
      getFavorite({ noPagination: true })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (favoriteProducts) {
      setFavorites(favoriteProducts?.results)
    }
  }, [favoriteProducts])

  return (
    <>
      <Header />
      {pageNeedToken.includes(pathname) && isLoading ? <div className={'w-full flex mx-auto my-5 justify-center'}>Loading...</div> : children}
      <Footer content={footerContent} />
    </>
  )
}
