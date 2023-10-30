import { useEffect } from 'react'

import { useAccountFavorite } from '@/hooks/pages/use-account-favorite'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'

import Account from '@/components/account'
import Favorite from '@/components/account/favorite'
import Meta from '@/components/common/meta'

export default function AccountPage() {
  const { getFavorite, data, isLoading, error } = useAccountFavorite()
  const { push } = useRouterWithQueryParams()

  useEffect(() => {
    getFavorite({ noPagination: true })
  }, [])

  useEffect(() => {
    if (error) push(routes.loginPage())
  }, [error])

  const resetData = () => {
    getFavorite({ noPagination: true })
  }

  return (
    <>
      <Meta title="Favorites" />
      <Account>
        <Favorite data={data?.results || []} onReset={resetData} />
      </Account>
    </>
  )
}
