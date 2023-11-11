import { useEffect } from 'react'

import { authenticationConfig } from '@/configs/authentication'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useAuthStore } from '@/recoil/auth'
import routes from '@/routes'
import { getLocalStorage } from '@/utils/helper'

import Account from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'

const accessToken = getLocalStorage(authenticationConfig.accessToken)
export default function AccountPage() {
  const { getProfile, profile } = useAccountInformation()
  const { profile: profileStage } = useAuthStore()
  const { push } = useRouterWithQueryParams()

  useEffect(() => {
    // if (profile?.error || profileStage || !accessToken) push(routes.loginPage())
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
