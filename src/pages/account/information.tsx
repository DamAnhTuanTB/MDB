import { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useAuthStore } from '@/recoil/auth'

import Account from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'

export default function AccountPage() {
  const { getProfile } = useAccountInformation()
  const { loginPutBack } = useCustomerLogin()
  const { profile: profileStage, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !profileStage) loginPutBack('/account/information')
  }, [isLoading, profileStage])

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
