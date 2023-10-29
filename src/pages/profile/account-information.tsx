import Meta from '@/components/common/meta'
import ProfileLayout from '@/components/profile'
import AccountInformation from '@/components/profile/account-information'

export default function ProfilePage() {
  return (
    <>
      <Meta title="Account information" />
      <ProfileLayout>
        <AccountInformation />
      </ProfileLayout>
    </>
  )
}
