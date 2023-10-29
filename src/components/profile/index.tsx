import React from 'react'

import styles from '@/styles/modules/profile/layout.module.scss'

import ProfileNavBar from './navbar'

type Props = {
  children: React.ReactNode
}

export default function ProfileLayout({ children }: Props) {
  return (
    <div className="container mx-auto">
      <div className={styles.layout}>
        <ProfileNavBar />
        <div className={styles.layout__container}>{children}</div>
      </div>
    </div>
  )
}
