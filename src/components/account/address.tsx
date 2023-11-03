import { useState } from 'react'

import { PROFILE_ID } from '@/constants/profile'
import styles from '@/styles/modules/account/content.module.scss'
import { AddressBody } from '@/types/address'

import CollapseItem from '@/components/common/collapse'

import AddressList from './address-list'
import ProfileLayout from './layout'

export const addresses: AddressBody[] = [
  {
    firstName: 'Victor Chue',
    lastName: 'Victor Chue',
    company: 'Popshap',
    address: '240 Hackensack, NJ 07601',
    email: 'victor@popshap.com',
    phoneNumber: '(888) 317-5531'
  },
  {
    firstName: 'Victor Chue',
    lastName: 'Victor Chue',
    company: 'Popshap',
    address: '240 Hackensack, NJ 07601',
    email: 'victor@popshap.com',
    phoneNumber: '(888) 317-5531'
  }
]

export default function AddressBook() {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  return (
    <>
      <ProfileLayout activeId={PROFILE_ID.ADDRESS} isShow={showMenu}>
        <CollapseItem title="Addresses" headingClassName={styles.collapse__heading} contentClassName={styles.collapse__content} className={styles.collapse} isActive onToggle={handleToggleCollapse}>
          <AddressList addresses={addresses} />
        </CollapseItem>
      </ProfileLayout>
    </>
  )
}
