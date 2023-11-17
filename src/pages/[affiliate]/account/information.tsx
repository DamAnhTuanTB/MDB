import { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useAuthStore } from '@/recoil/auth'

import Account from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'

export default function AccountPage() {
  const { getProfile, profile } = useAccountInformation()
  const { loginPutBack } = useCustomerLogin()
  const { profile: profileStage, isLoggedIn } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn) loginPutBack('/account/information')
  }, [isLoggedIn])

  const resetData = () => {
    getProfile(undefined)
  }

  return (
    <>
      <Meta title="Account information" />
      <Account>
        <AccountInformation profile={profileStage} onReset={resetData} />
      </Account>
    </>
  )
}
