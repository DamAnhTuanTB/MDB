import { useMemo } from 'react'

import styles from '@/styles/modules/product/description.module.scss'

import CollapseItem from '@/components/common/collapse'
import Tabs, { TabItem } from '@/components/common/tabs'

import DescriptionDetail from './detail'

export default function Description() {
  const tabs: TabItem[] = [{ label: 'Details' }, { label: 'How to Use' }, { label: 'Shipping & Returns' }, { label: 'Q&A' }]

  const collapseElements = useMemo(
    () =>
      tabs.map((tab, index) => (
        <CollapseItem key={index} title={tab.label}>
          <DescriptionDetail />
        </CollapseItem>
      )),
    []
  )

  return (
    <>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} wrapperClassName={styles.tabs__wrapper} labelClassName={styles.tabs__label}>
          <DescriptionDetail />
          <div>tab2</div>
          <div>tab4</div>
        </Tabs>
      </div>
      <div className={styles.collapse}>{collapseElements}</div>
    </>
  )
}
