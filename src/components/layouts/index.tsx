import React, { useEffect } from 'react'

import { authenticationConfig } from '@/configs/authentication'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useAuthStore } from '@/recoil/auth'
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
  const { setIsLoggedIn, setProfile, profile: profileStage } = useAuthStore()

  useEffect(() => {
    if (accessToken && !profile) {
      getProfile({})
    }
  }, [])

  useEffect(() => {
    if (profile?.data) {
      setIsLoggedIn(true)
      setProfile(profile.data)
    } else if (profile?.error) {
      setIsLoggedIn(false)
      setProfile(undefined)
    }
  }, [profile?.data])

  return (
    <>
      <Header />
      {children}
      <Footer content={footerContent} />
    </>
  )
}
