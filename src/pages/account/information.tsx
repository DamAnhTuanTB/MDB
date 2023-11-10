import { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'

import Account from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'
import { getLocalStorage } from '@/utils/helper'
import { authenticationConfig } from '@/configs/authentication'
import { useAuthStore } from '@/recoil/auth'

const accessToken = getLocalStorage(authenticationConfig.accessToken)
export default function AccountPage() {
  const { getProfile, profile } = useAccountInformation()
  const { profile: profileStage } = useAuthStore()
  const { push } = useRouterWithQueryParams()

  useEffect(() => {
    if (profile?.error || profileStage || !accessToken) push(routes.loginPage())
  }, [profile?.error, profileStage])

  const resetData = () => {
    getProfile(undefined)
  }

  return (
    <>
      <Meta title="Account information" />
      <Account>
        <AccountInformation profile={profile?.data} onReset={resetData} />
      </Account>
    </>
  )
}
