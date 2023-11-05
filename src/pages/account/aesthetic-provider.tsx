import { AestheticProvider } from '@/types/account/aesthetic-provider'

import ProfileLayout from '@/components/account'
import AestheticProviderComponent from '@/components/account/aesthetic-provider'
import Meta from '@/components/common/meta'

export const aestheticProviders: AestheticProvider[] = [
  {
    id: '001',
    name: 'Daniel Jensen'
  },
  {
    id: '002',
    name: 'Tom Peng'
  }
]

export default function AestheticProvider() {
  return (
    <>
      <Meta title="Aesthetic Provider" />
      <ProfileLayout>
        <AestheticProviderComponent aestheticProviderList={aestheticProviders} />
      </ProfileLayout>
    </>
  )
}
