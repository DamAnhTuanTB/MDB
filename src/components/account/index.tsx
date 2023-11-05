import React from 'react'

import { useRecoilState } from 'recoil'

import { notificationState } from '@/recoil/notification'
import styles from '@/styles/modules/account/index.module.scss'

import Notification from '../common/notification'

import AccountSidebar from './sidebar'

type Props = {
  children: React.ReactNode
}

export default function Account({ children }: Props) {
  const [notification] = useRecoilState(notificationState)

  return (
    <div className="container mx-auto">
      <div className={styles.layout}>
        <AccountSidebar className={styles.layout__sidebar} />
        <div className={styles.layout__container}>
          {notification && <Notification className={styles.notification} message={notification.message} type={notification.type} />}
          {children}
        </div>
      </div>
    </div>
  )
}
