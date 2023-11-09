import { useEffect } from 'react'

import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'

import Account from '@/components/account'
import AccountInformation from '@/components/account/information'
import Meta from '@/components/common/meta'

export default function AccountPage() {
  const { getProfile, profile } = useAccountInformation()
  const { push } = useRouterWithQueryParams()

  // useEffect(() => {
  //   console.log('info call me');
  //   getProfile(undefined)
  // }, [])

  useEffect(() => {
    if (profile?.error) push(routes.loginPage())
  }, [profile?.error])

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
