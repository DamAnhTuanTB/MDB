import { useMemo } from 'react'

import styles from '@/styles/modules/product/description.module.scss'
import { Product } from '@/types/product'

import CollapseItem from '@/components/common/collapse'
import Tabs, { TabItem } from '@/components/common/tabs'

import DescriptionDetail from './detail'
import HowToUse from './how-to-use'

type Props = {
  data: Product
}

export default function Description({ data }: Props) {
  const tabs: TabItem[] = [{ label: 'Details' }, { label: 'How to Use' }]
  // { label: 'Shipping & Returns' }, { label: 'Q&A' }

  const collapseElements = useMemo(
    () =>
      tabs.map((tab, index) => (
        <CollapseItem key={index} title={tab.label}>
          <DescriptionDetail data={data} />
        </CollapseItem>
      )),
    []
  )

  return (
    <>
      <div className={styles.tabs}>
        <Tabs tabs={tabs} wrapperClassName={styles.tabs__wrapper} labelClassName={styles.tabs__label}>
          <DescriptionDetail data={data} />
          <HowToUse text={data.howToUse} />
        </Tabs>
      </div>
      <div className={styles.collapse}>{collapseElements}</div>
    </>
  )
}
