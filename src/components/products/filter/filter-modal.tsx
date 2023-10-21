import { useMemo, useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames'

import { defaultFilterGroup } from '@/constants/product'
import styles from '@/styles/modules/product/filter-modal.module.scss'
import { DefaultFilterData } from '@/types/product'
import { AttributeFilterItem, ProductAttributeItem, productAttributeGroup } from '@/types/product/attribute'

import Button from '@/components/common/button'

import CheckListGroup from './checkbox-group'
import Rating from './rating'
import Slider from './slider'

const defaultTitle = 'Filter'

type Props = {
  open: boolean
  attributes: ProductAttributeItem[]
  defaultFilterData: DefaultFilterData
  clearAllFilter?: boolean
  onClearFilter: () => void
  onClose: () => void
}

export default function FilterModal({ open, attributes, defaultFilterData, clearAllFilter = false, onClose, onClearFilter }: Props) {
  const [modalTitle, setModalTitle] = useState<string>(defaultTitle)
  const [detailFilter, setDetailFilter] = useState<AttributeFilterItem>()

  const handleFilterDetail = (filter: AttributeFilterItem) => {
    setModalTitle(filter.name)
    setDetailFilter(filter)
  }

  const closeModal = () => {
    setModalTitle(defaultTitle)
    onClose()
  }

  const resetFilter = () => {
    if (modalTitle === defaultTitle) return

    setModalTitle(defaultTitle)
    setDetailFilter(undefined)
  }

  const handleClearFilter = () => {
    onClearFilter()
    closeModal()
  }

  const filterElements = useMemo(
    () =>
      defaultFilterGroup.map((item) => {
        const attribute = attributes?.find((attr) => attr.key === item.key)
        if (!attribute) return item

        return {
          ...item,
          attributes: attribute.attributes
        }
      }),
    [attributes]
  )

  const groupItemElements = useMemo(
    () =>
      filterElements.map((filter, index) => (
        <div key={index} className={styles.content__title} onClick={() => handleFilterDetail(filter)}>
          {filter.name}
          <Image className="-rotate-90" src={'/images/icons/arrow_blue.svg'} width={24} height={24} alt="filter" />
        </div>
      )),
    []
  )

  const detailElement = useMemo(() => {
    switch (detailFilter?.type) {
      case 'slider':
        return <Slider clearFilter={clearAllFilter} title="Price" min={defaultFilterData?.price.min || 0} max={defaultFilterData?.price.max || 1000} />
      case 'rating':
        return <Rating clearFilter={clearAllFilter} title="Rating" />
      default:
        return <CheckListGroup attributes={detailFilter?.attributes || []} title={detailFilter?.name} isSPF={detailFilter?.key === productAttributeGroup.SPF} clearFilter={clearAllFilter} />
    }
  }, [clearAllFilter, defaultFilterData, detailFilter])

  return (
    <div className={classNames(styles.wrapper, { [styles['open']]: open })}>
      <div className={styles.heading}>
        <div className={styles.heading__group} onClick={resetFilter}>
          {modalTitle !== 'Filter' && <Image className="rotate-90 -ml-4 mr-2" src={'/images/icons/arrow_black.svg'} width={24} height={24} alt="filter" />}
          <span>{modalTitle}</span>
        </div>
        <Image src={'/images/icons/close.svg'} width={24} height={24} alt="filter" onClick={closeModal} />
      </div>
      <div className={styles.content}>{modalTitle === defaultTitle ? groupItemElements : detailElement}</div>
      <div className={styles.footer}>
        <Button variant="outlined" onClick={handleClearFilter}>
          Clear
        </Button>
        <Button onClick={closeModal}>Apply</Button>
      </div>
    </div>
  )
}
