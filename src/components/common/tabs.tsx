import React, { useMemo, useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/tabs.module.scss'

export type TabItem = {
  label: string
}

type Props = {
  tabs: TabItem[]
  children: React.ReactNode[]
  className?: string
  wrapperClassName?: string
  headingClassName?: string
  contentClassName?: string
  labelClassName?: string
}

export default function Tabs({ tabs, children, className, wrapperClassName, headingClassName, contentClassName, labelClassName }: Props) {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  const tabElements = useMemo(
    () =>
      tabs.map((tab, index) => (
        <span key={index} onClick={() => handleTabClick(index)} className={classNames(styles.tab__label, labelClassName, { [styles.active]: index === activeTab })}>
          {tab.label}
        </span>
      )),
    [tabs, activeTab]
  )

  return (
    <div className={classNames(styles.tab, className)}>
      <div className={classNames(styles.tab__wrapper, wrapperClassName)}>
        <div className={classNames(styles.tab__heading, headingClassName)}>{tabElements}</div>
      </div>
      <div className={classNames(styles.tab__content, contentClassName)}>{children[activeTab]}</div>
    </div>
  )
}
