import React, { useEffect } from 'react'

import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useAuthStore } from '@/recoil/auth'
import { useFavoriteStore } from '@/recoil/favorite'

type Props = {
  children: React.ReactNode
}

export default function Root({ children }: Props) {
  const { getProfile, profile } = useAccountInformation()
  const { isLoggedIn, setIsLoggedIn, setProfile } = useAuthStore()
  const { setFavorites } = useFavoriteStore()
  const { getFavorite, data: favoriteProducts } = useAccountFavorite()

  useEffect(() => {
    getProfile({})
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
    }
  }, [profile?.data])

  useEffect(() => {
    if (profile?.error) {
      setProfile(undefined)
      setIsLoggedIn(false)
    }
  }, [profile?.error])

  useEffect(() => {
    if (favoriteProducts) {
      setFavorites(favoriteProducts?.results)
    }
  }, [favoriteProducts])

  return <>{children}</>
}
