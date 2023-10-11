import React, { useMemo, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/tabs.module.scss'

export type TabItem = {
  label: string
}

type Props = {
  tabs: TabItem[]
  children: React.ReactNode[]
}

export default function Tabs({ tabs, children }: Props) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const tabElements = useMemo(
    () =>
      tabs.map((tab, index) => (
        <span key={index} onClick={() => handleTabClick(index)} className={classNames(styles.tab__label, { [styles.active]: index === activeTab })}>
          {tab.label}
        </span>
      )),
    [tabs, activeTab]
  )

  return (
    <div className={styles.tab}>
      <div className={styles.tab__wrapper}>
        <div className={styles.tab__heading}>{tabElements}</div>
      </div>
      <div className={styles.tab__content}>{children[activeTab]}</div>
    </div>
  )
}
