import React from 'react'

import styles from '@/styles/modules/profile/index.module.scss'

import ProfileNavBar from './sidebar'

type Props = {
  children: React.ReactNode
}

export default function ProfileComponent({ children }: Props) {
  return (
    <div className="container mx-auto">
      <div className={styles.layout}>
        <ProfileNavBar className={styles.layout__sidebar} />
        <div className={styles.layout__container}>{children}</div>
      </div>
    </div>
  )
}
