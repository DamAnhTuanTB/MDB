import { useEffect } from 'react'

import { useAccountAddress } from '@/hooks/pages/use-account-address'

import ProfileLayout from '@/components/account'
import AddressBook from '@/components/account/address'
import Meta from '@/components/common/meta'

export default function Addresses() {
  const { getAddressList, addresses } = useAccountAddress()

  useEffect(() => {
    getAddressList(undefined)
  }, [])

  return (
    <>
      <Meta title="Address Book" />
      <ProfileLayout>
        <AddressBook addresses={addresses?.data?.results} onReloadList={() => getAddressList(undefined)} />
      </ProfileLayout>
    </>
  )
}
