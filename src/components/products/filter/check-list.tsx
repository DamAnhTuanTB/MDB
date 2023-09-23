import { useMemo, useState } from 'react'

import Image from 'next/image'

import styles from '@/styles/modules/product/sidebar.module.scss'

import Checkbox from '../../common/checkbox'

import { Filter, FilterGroup } from '.'

type Props = {
  value: FilterGroup
}

export default function CheckList({ value }: Props) {
  const maxItem = 8
  const [listRenderItem, setListRenderItem] = useState<Filter[]>(value.checkList ? value.checkList?.slice(0, maxItem) : [])

  const handleSeeAll = () => {
    if (value.checkList && value.checkList?.length > maxItem) {
      setListRenderItem(value.checkList)
    }
  }

  const checkListElement = useMemo(
    () => listRenderItem && listRenderItem.map((item, index) => <Checkbox key={index} label={item.label} onChange={(checked) => console.log(item.key, checked)} />),
    [listRenderItem]
  )

  return (
    <div className={styles.group}>
      <div className={styles.group__title}>{value.title}</div>
      <div className={styles.group__value}>{checkListElement}</div>
      {value.checkList && value.checkList.length > listRenderItem.length && (
        <div className={styles.group__more} onClick={handleSeeAll}>
          <Image src={'/images/icons/arrow_blue.svg'} width={24} height={24} alt="see more" />
          See more
        </div>
      )}
    </div>
  )
}
