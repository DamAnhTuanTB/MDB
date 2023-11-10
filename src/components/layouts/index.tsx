import React, { useEffect } from 'react'

import { authenticationConfig } from '@/configs/authentication'
import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
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
  const { isLoggedIn, setIsLoggedIn, setProfile, profile: profileStage } = useAuthStore()
  const { getFavorite, data: favoriteProducts } = useAccountFavorite()
  const { setFavorites } = useFavoriteStore()

  useEffect(() => {
    if (accessToken && !profile) {
      getProfile({})
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      getFavorite({ noPagination: true })
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (profile?.data) {
      setIsLoggedIn(true)
      setProfile(profile.data)
    } else if (profile?.error) {
      setIsLoggedIn(false)
      setProfile(undefined)
    }
  }, [profile])

  useEffect(() => {
    if (favoriteProducts) {
      setFavorites(favoriteProducts?.results)
    }
  }, [favoriteProducts])

  return (
    <>
      <Header />
      {children}
      <Footer content={footerContent} />
    </>
  )
}
