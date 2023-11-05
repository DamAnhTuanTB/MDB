import { useEffect } from 'react'

import { useAccountAddress } from '@/hooks/pages/use-account-address'

import ProfileLayout from '@/components/account'
import AddressBook from '@/components/account/address'
import Meta from '@/components/common/meta'

export default function Addresses() {
  const { getAdressList, addresses } = useAccountAddress()

  useEffect(() => {
    getAdressList(undefined)
  }, [])

  return (
    <>
      <Meta title="Address Book" />
      <ProfileLayout>
        <AddressBook addresses={addresses?.data?.results} onReloadList={() => getAdressList(undefined)} />
      </ProfileLayout>
    </>
  )
}
