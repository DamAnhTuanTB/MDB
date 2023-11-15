import React, { useEffect, useRef } from 'react'

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
const accessToken = getLocalStorage(authenticationConfig.accessToken)
export default function Layout({ children, footerContent }: Props) {
  const { getProfile, profile } = useAccountInformation()
  const { logout } = useCustomerLogin()
  const { isLoggedIn, setIsLoggedIn, setProfile, isLoading, profile: profileStage, setIsLoading } = useAuthStore()
  const { getFavorite, data: favoriteProducts } = useAccountFavorite()
  const { setFavorites } = useFavoriteStore()
  const { pathname } = useRouter()
  const isLoad = useRef<boolean>(false)

  const pageNeedToken = ['/account/information', '/account/favorite']

  useEffect(() => {
    if (accessToken && !profile) {
      getProfile(undefined)
    }
  }, [profile, getProfile])

  useEffect(() => {
    if (profile?.isLoading) {
      if (profile.data) {
        setProfile(profile?.data)
        setIsLoggedIn(true)
      } else if (profile.error) {
        setIsLoggedIn(false)
        setProfile(undefined)
        logout()
      }
    }
  }, [profile, setProfile, setIsLoggedIn, logout])

  useEffect(() => {
    if (isLoggedIn) getFavorite({ noPagination: true })
  }, [isLoggedIn, getFavorite])

  useEffect(() => {
    if (favoriteProducts) {
      setFavorites(favoriteProducts?.results)
    }
  }, [favoriteProducts, setFavorites])

  return (
    <>
      <Header />
      {pageNeedToken.includes(pathname) && accessToken && profile?.isLoading ? <div className={'w-full flex mx-auto my-5 justify-center'}>Loading...</div> : children}
      <Footer content={footerContent} />
    </>
  )
}
