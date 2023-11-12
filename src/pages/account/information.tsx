import { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useAuthStore } from '@/recoil/auth'

import Account from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'

export default function AccountPage() {
  const { getProfile } = useAccountInformation()
  const { profile: profileStage, isLoading } = useAuthStore()
  const { push } = useRouterWithQueryParams()

  useEffect(() => {
    if (!isLoading && !profileStage) {
      push({
        pathname: '/customer/login',
        query: {
          onBack: '/account/information'
        }
      })
    }
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
