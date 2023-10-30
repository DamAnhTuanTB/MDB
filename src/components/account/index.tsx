import React from 'react'

import styles from '@/styles/modules/account/index.module.scss'

import AccountSidebar from './sidebar'

type Props = {
  children: React.ReactNode
}

export default function Account({ children }: Props) {
  return (
    <div className="container mx-auto">
      <div className={styles.layout}>
        <AccountSidebar className={styles.layout__sidebar} />
        <div className={styles.layout__container}>{children}</div>
      </div>
    </div>
  )
}
