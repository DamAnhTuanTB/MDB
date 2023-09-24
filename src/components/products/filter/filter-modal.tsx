import { useMemo, useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames'

import { filterList } from '@/configs/product-filter'
import styles from '@/styles/modules/product/filter-modal.module.scss'

import Button from '@/components/common/button'

import CheckList from './check-list'
import Rating from './rating'
import Slider from './slider'

import { FilterGroup } from '.'

const defaultTitle = 'Filter'

type Props = {
  open: boolean
  onClose?: () => void
}

export default function FilterModal({ open, onClose }: Props) {
  const [modalTitle, setModalTitle] = useState<string>(defaultTitle)
  const [detailFilter, setDetailFilter] = useState<FilterGroup>()

  const handleFilterDetail = (filter: FilterGroup) => {
    setModalTitle(filter.title)
    setDetailFilter(filter)
  }

  const closeModal = () => {
    setModalTitle(defaultTitle)
    onClose && onClose()
  }

  const resetFilter = () => {
    if (modalTitle === defaultTitle) return

    setModalTitle(defaultTitle)
    setDetailFilter(undefined)
  }

  const groupItemElements = useMemo(
    () =>
      filterList.map((filter, index) => (
        <div key={index} className={styles.content__title} onClick={() => handleFilterDetail(filter)}>
          {filter.title}
          <Image className="-rotate-90" src={'/images/icons/arrow_blue.svg'} width={24} height={24} alt="filter" />
        </div>
      )),
    []
  )

  const detailElement = useMemo(() => {
    switch (detailFilter?.type) {
      case 'checkList':
        return <CheckList withTitle={false} value={detailFilter} />
      case 'range':
        return <Slider withTitle={false} title={detailFilter.title} />
      case 'rating':
        return <Rating withTitle={false} title={detailFilter.title} />
      default:
        return
    }
  }, [detailFilter])

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
        <Button variant="outlined" onClick={closeModal}>
          Clear
        </Button>
        <Button onClick={closeModal}>Apply</Button>
      </div>
    </div>
  )
}
