import styles from '@/styles/modules/product/description.module.scss'

import Tabs, { TabItem } from '@/components/common/tabs'

import DescriptionDetail from './detail'

export default function Description() {
  const tabs: TabItem[] = [{ label: 'Details' }, { label: 'How to Use' }, { label: 'Shipping & Returns' }, { label: 'Q&A' }]
  return (
    <div className={styles.tabs}>
      <Tabs tabs={tabs} wrapperClassName={styles.tabs__wrapper} labelClassName={styles.tabs__label}>
        <DescriptionDetail />
        <div>tab2</div>
        <div>tab3</div>
        <div>tab4</div>
      </Tabs>
    </div>
  )
}
