import { useEffect } from 'react'

import { useAccountAesthetic } from '@/hooks/pages/use-account-aesthetic'

import ProfileLayout from '@/components/account'
import AestheticProviderComponent from '@/components/account/aesthetic-provider'
import Meta from '@/components/common/meta'

export default function AestheticProvider() {
  const { aesthetic, getAesthetic } = useAccountAesthetic()

  useEffect(() => {
    getAesthetic(undefined)
  }, [])

  return (
    <>
      <Meta title="Aesthetic Provider" />
      <ProfileLayout>
        <AestheticProviderComponent aestheticProvider={aesthetic?.data?.aestheticProvider} />
      </ProfileLayout>
    </>
  )
}
