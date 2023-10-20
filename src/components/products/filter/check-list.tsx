import { memo, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames'

import { productConfigs } from '@/configs/product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import styles from '@/styles/modules/product/sidebar.module.scss'
import { ProductAttribute } from '@/types/product/attribute'

import Checkbox from '../../common/checkbox'

type Props = {
  attributes: ProductAttribute[]
  title?: string
}

function CheckList({ attributes, title }: Props) {
  const [listRenderItem, setListRenderItem] = useState(attributes.slice(0, productConfigs.filterMaxItem))
  const { query, updateQueryParams } = useRouterWithQueryParams()
  const [selectedId, setSelectedId] = useState<string[]>(query.attributeIds ? (typeof query.attributeIds === 'string' ? [query.attributeIds] : query.attributeIds) : [])

  useEffect(() => {
    updateQueryParams({ ...query, attributeIds: selectedId })
  }, [selectedId])

  // useEffect(() => {
  //   console.log(query.attributeIds)

  //   if (!query.attributeIds) {
  //     setSelectedId([])
  //   }
  // }, [query])

  const handleSeeAll = () => {
    if (attributes.length > productConfigs.filterMaxItem) {
      setListRenderItem(attributes)
    }
  }

  const toggleCheckbox = (checked: boolean, id: string) => {
    if (checked) setSelectedId((preValue) => [...preValue, id])
    else setSelectedId((preValue) => preValue.filter((item) => item !== id))
  }

  const checkListElement = useMemo(
    () => listRenderItem && listRenderItem.map((item) => <Checkbox key={item.id} checked={selectedId.includes(item.id)} label={item.value} onChange={(checked) => toggleCheckbox(checked, item.id)} />),
    [listRenderItem, selectedId]
  )

  return (
    <div className={classNames(styles.group, { '!mt-0': !title })}>
      {title && <div className={styles.group__title}>{title}</div>}
      <div className={classNames(styles.group__value, { '!pl-0 !mt-0': !title })}>{checkListElement}</div>
      {attributes.length > listRenderItem.length && (
        <div className={styles.group__more} onClick={handleSeeAll}>
          <Image src={'/images/icons/arrow_blue.svg'} width={24} height={24} alt="see more" />
          See more
        </div>
      )}
    </div>
  )
}

export default memo(CheckList)
