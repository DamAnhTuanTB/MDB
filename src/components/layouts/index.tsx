import React, { useEffect, useRef } from 'react'

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
  const { isLoggedIn, setIsLoggedIn, setProfile, isLoading, profile: profileStage, setIsLoading } = useAuthStore()
  const { getFavorite, data: favoriteProducts } = useAccountFavorite()
  const { setFavorites } = useFavoriteStore()
  const isLoad = useRef<boolean>(false)

  useEffect(() => {
    if (accessToken && !profileStage && isLoading) {
      setIsLoading(true)
      if (!isLoad.current) {
        isLoad.current = true
        getProfile({})
      }
    } else {
      setIsLoading(false)
    }
  }, [profileStage, isLoading, isLoad.current])

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
      isLoad.current = false
      setIsLoading(false)
    }
  }, [profile])

  useEffect(() => {
    if (profileStage) {
      isLoad.current = false
      setIsLoading(false)
    }
  }, [profileStage])

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
