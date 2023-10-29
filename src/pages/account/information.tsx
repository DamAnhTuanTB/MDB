import { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'

import ProfileLayout from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'

export default function ProfilePage() {
  const { getProfile, profile } = useAccountInformation()

  useEffect(() => {
    getProfile(undefined)
  }, [])

  const resetData = () => {
    getProfile(undefined)
  }

  return (
    <>
      <Meta title="Account information" />
      <ProfileLayout>{profile?.data && <AccountInformation profile={profile.data} onReset={resetData} />}</ProfileLayout>
    </>
  )
}
