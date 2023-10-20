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
  clearFilter?: boolean
  isSPF?: boolean
}

function CheckboxGroup({ attributes, title, clearFilter = false, isSPF = false }: Props) {
  const [listRenderItem, setListRenderItem] = useState(attributes.slice(0, productConfigs.filterMaxItem))
  const { query, updateQueryParams } = useRouterWithQueryParams()
  const [selectedId, setSelectedId] = useState<string[]>(typeof query.attributeIds === 'string' ? [query.attributeIds] : query.attributeIds || [])
  const [minSpf, setMinSpf] = useState<number | null>(query.minSpf === '' ? null : Number(query.minSpf))
  const [maxSpf, setMaxSpf] = useState<number | null>(query.maxSpf === '' ? null : Number(query.maxSpf) || null)

  useEffect(() => {
    if (clearFilter) {
      setSelectedId([])
      setMinSpf(null)
      setMaxSpf(null)
    }
  }, [clearFilter])

  useEffect(() => {
    updateQueryParams({ ...query, attributeIds: selectedId })
  }, [selectedId])

  useEffect(() => {
    if (minSpf !== null && maxSpf !== null) updateQueryParams({ ...query, minSpf: minSpf !== null ? minSpf : '', maxSpf: maxSpf !== null ? maxSpf : '' })
  }, [maxSpf, minSpf])

  const handleSeeAll = () => {
    if (attributes.length > productConfigs.filterMaxItem) {
      setListRenderItem(attributes)
    }
  }

  const toggleCheckbox = (checked: boolean, data: ProductAttribute) => {
    if (checked) setSelectedId((preValue) => [...preValue, data.id])
    else setSelectedId(selectedId.filter((item) => item !== data.id))
  }

  const checkListElement = useMemo(
    () => listRenderItem && listRenderItem.map((item) => <Checkbox key={item.id} checked={selectedId.includes(item.id)} label={item.value} onChange={(checked) => toggleCheckbox(checked, item)} />),
    [listRenderItem, selectedId]
  )

  const toggleSpfCheckbox = (checked: boolean, data: ProductAttribute) => {
    setMinSpf(checked ? data.minValue : null)
    setMaxSpf(checked ? data.maxValue : null)
  }

  const checkListSpfElement = useMemo(
    () =>
      listRenderItem &&
      listRenderItem.map((item) => (
        <Checkbox key={item.id} checked={minSpf === item.minValue && maxSpf === item.maxValue} label={item.value} onChange={(checked) => toggleSpfCheckbox(checked, item)} />
      )),
    [listRenderItem, maxSpf, minSpf]
  )

  return (
    <div className={classNames(styles.group, { '!mt-0': !title })}>
      {title && <div className={styles.group__title}>{title}</div>}
      <div className={classNames(styles.group__value, { '!pl-0 !mt-0': !title })}>{isSPF ? checkListSpfElement : checkListElement}</div>
      {attributes.length > listRenderItem.length && (
        <div className={styles.group__more} onClick={handleSeeAll}>
          <Image src={'/images/icons/arrow_blue.svg'} width={24} height={24} alt="see more" />
          See more
        </div>
      )}
    </div>
  )
}

export default memo(CheckboxGroup)
