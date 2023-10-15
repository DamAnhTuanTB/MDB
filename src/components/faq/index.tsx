import { useMemo } from 'react'

import classNames from 'classnames'

import { tabs } from '@/constants/faq'
import styles from '@/styles/modules/faq.module.scss'

import Tabs, { TabItem } from '@/components/common/tabs'

import CollapseItem from '../common/collapse'
import PageTitle from '../common/page-title'

export default function FrequentlyAskedQuestions() {
  const tabItems: TabItem[] = useMemo(() => tabs.map((tab) => ({ label: tab.label })), [])

  const renderCollapseItems = useMemo(() => {
    return tabs.map((tab, tabIndex) => (
      <div key={tabIndex}>
        {tab.collapse.map((collapse, collapseIndex) => (
          <CollapseItem key={collapseIndex} title={collapse.question} className={styles.collapse}>
            {collapse.answer}
          </CollapseItem>
        ))}
      </div>
    ))
  }, [])

  return (
    <div className="container mx-auto">
      <div className={classNames(styles.wrapper, 'page-container')}>
        <PageTitle title="Frequently Asked Questions" />
        <Tabs tabs={tabItems} wrapperClassName={styles.tabs__wrapper} headingClassName={styles.tabs__heading} contentClassName={styles.tabs__content} labelClassName={styles.tabs__label}>
          {renderCollapseItems}
        </Tabs>
      </div>
    </div>
  )
}
