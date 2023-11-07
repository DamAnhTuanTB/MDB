import React, { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useAuthStore } from '@/recoil/auth'

type Props = {
  children: React.ReactNode
}

export default function Root({ children }: Props) {
  const { getProfile, profile } = useAccountInformation()
  const { setIsLoggedIn, setProfile } = useAuthStore()

  useEffect(() => {
    getProfile({})
  }, [])

  useEffect(() => {
    if (profile?.data) {
      setIsLoggedIn(true)
      setProfile(profile.data)
    }
  }, [profile?.data])

  useEffect(() => {
    if (profile?.error) {
      setProfile(undefined)
      setIsLoggedIn(false)
    }
  }, [profile?.error])

  return <>{children}</>
}
