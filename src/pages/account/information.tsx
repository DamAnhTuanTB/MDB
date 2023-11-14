import { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useAuthStore } from '@/recoil/auth'

import Account from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'
import Loading from '@/components/loading'

export default function AccountPage() {
  const { getProfile } = useAccountInformation()
  const { loginPutBack } = useCustomerLogin()
  const { profile: profileStage, isLoading, isLoggedIn } = useAuthStore()

  useEffect(() => {
    if (!isLoggedIn) loginPutBack('/account/information')
  }, [isLoading, profileStage])

  const resetData = () => {
    getProfile(undefined)
  }

  return (
    <>
      <Meta title="Account information" />
      <Account>
        {isLoading && <Loading />}
        {!isLoading && <AccountInformation profile={profileStage} onReset={resetData} />}
      </Account>
    </>
  )
}
