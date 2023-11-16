import { useEffect, useState } from 'react'

import { PROFILE_ID } from '@/constants/profile'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useAuthStore } from '@/recoil/auth'
import styles from '@/styles/modules/account/content.module.scss'
import { AddressType } from '@/types/account/address'

import CollapseItem from '@/components/common/collapse'

import ProfileLayout from '../layout'

import AddressList from './list'

type Props = {
  addresses?: AddressType[]
  onReloadList: () => void
}

export default function AddressBook({ addresses, onReloadList }: Props) {
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const { isLoggedIn } = useAuthStore()
  const { loginPutBack } = useCustomerLogin()

  useEffect(() => {
    if (!isLoggedIn) loginPutBack('/account/address')
  }, [isLoggedIn])

  const handleToggleCollapse = (value: boolean) => {
    setShowMenu(!value)
  }

  return (
    <>
      <ProfileLayout activeId={PROFILE_ID.ADDRESS} isShow={showMenu}>
        <CollapseItem title="Addresses" headingClassName={styles.collapse__heading} contentClassName={styles.collapse__content} className={styles.collapse} isActive onToggle={handleToggleCollapse}>
          {addresses && <AddressList addresses={addresses} onReloadList={onReloadList} />}
        </CollapseItem>
      </ProfileLayout>
    </>
  )
}
