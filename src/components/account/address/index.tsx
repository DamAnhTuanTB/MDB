import { useState } from 'react'

import { addresses } from '@/constants/addresses'
import { PROFILE_ID } from '@/constants/profile'
import styles from '@/styles/modules/account/content.module.scss'

import CollapseItem from '@/components/common/collapse'

import ProfileLayout from '../layout'

import AddressList from './address-list'

export default function AddressBook() {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  return (
    <>
      <ProfileLayout activeId={PROFILE_ID.ADDRESS} isShow={showMenu}>
        <CollapseItem
          title="Addresses"
          headingClassName={styles.collapse__heading}
          contentClassName={styles.collapse__content}
          className={styles.collapse}
          isActive
          onToggle={() => handleToggleCollapse}
        >
          <AddressList addresses={addresses} />
        </CollapseItem>
      </ProfileLayout>
    </>
  )
}
