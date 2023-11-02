import ProfileLayout from '@/components/account'
import AddressBook from '@/components/account/address'
import Meta from '@/components/common/meta'

export default function Addresses() {
  return (
    <>
      <Meta title="Address Book" />
      <ProfileLayout>
        <AddressBook />
      </ProfileLayout>
    </>
  )
}
