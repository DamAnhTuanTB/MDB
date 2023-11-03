import { useMemo, useState } from 'react'

import { PROFILE_ID } from '@/constants/profile'
import useDevice from '@/hooks/use-device'
import styles from '@/styles/modules/account/content.module.scss'
import { AestheticProvider } from '@/types/account/aesthetic-provider'

import CollapseItem from '@/components/common/collapse'

import ProfileLayout from './layout'

type Props = {
  aestheticProviderList: AestheticProvider[]
}

const AestheticProvider = ({ aestheticProviderList }: Props) => {
  const { isMobile } = useDevice()
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  const annotation = (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat.{' '}
    </p>
  )

  const aestheticProviders = useMemo(
    () =>
      aestheticProviderList &&
      aestheticProviderList.map((item, index) => {
        return (
          <div key={index} className={styles.aesthetic}>
            <h5 className={styles.aesthetic__title}>Provider Name</h5>
            <p className={styles.aesthetic__name}>{item.name}</p>
          </div>
        )
      }),
    [aestheticProviderList]
  )

  return (
    <ProfileLayout activeId={PROFILE_ID.AESTHETIC_PROVIDER} isShow={showMenu}>
      <CollapseItem
        title="Aesthetic Provider"
        headingClassName={styles.collapse__heading}
        contentClassName={styles.collapse__content}
        className={styles.collapse}
        isActive
        onToggle={handleToggleCollapse}
        annotation={annotation}
        directionDropdown={isMobile ? 'bottom' : 'right'}
      >
        {aestheticProviders}
      </CollapseItem>
    </ProfileLayout>
  )
}

export default AestheticProvider
