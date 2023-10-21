import { useEffect, useMemo, useRef, useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames'
import { debounce } from 'lodash'
import Swiper from 'swiper'
import { z } from 'zod'

import initCarousel, { Options } from '@/services/carousel'

import configs from '@/configs'
import { sortOptions } from '@/constants/product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import styles from '@/styles/modules/product/index.module.scss'
import { DefaultFilterData, Product } from '@/types/product'
import { ProductAttributeItem } from '@/types/product/attribute'

import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'
import FilterModal from '@/components/products/filter/filter-modal'

import ProductItem from './item'

const sortSchema = z.object({
  sort: z.string().optional()
})

type Props = {
  title?: string
  products: Product[]
  spCarousel?: boolean
  page?: string
  isShowSort?: boolean
  isShowFilter?: boolean
  clearFilter?: boolean
  attributes: ProductAttributeItem[]
  defaultFilterData: DefaultFilterData
  onClearFilter: () => void
}

export default function ProductList({
  products,
  title,
  spCarousel = false,
  isShowSort = false,
  isShowFilter = false,
  page = '',
  clearFilter = false,
  attributes,
  defaultFilterData,
  onClearFilter
}: Props) {
  const { query, updateQueryParams } = useRouterWithQueryParams()
  const carousel = useRef<Swiper>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openQuickReview, setOpenQuickReview] = useState<boolean>(false)
  const [quickReviewData, setQuickReviewData] = useState<Product>()
  const [sortValue, setSortValue] = useState<string>((query.sort as string) || 'price')

  useEffect(() => {
    if (spCarousel) {
      const options: Options = {
        spaceBetween: 16,
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 5000
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }

      const init = () => {
        if (window.innerWidth < configs.breakpointSp) {
          carousel.current = initCarousel('#productList', options)
        } else {
          if (carousel.current) {
            carousel.current?.destroy()
          }
        }
      }

      init()
      window.addEventListener('resize', debounce(init, 30))
    }
  }, [spCarousel])

  useEffect(() => {
    if (clearFilter) setSortValue('')
  }, [clearFilter])

  useEffect(() => {
    updateQueryParams({
      ...query,
      sort: sortValue,
      page: 1
    })
  }, [sortValue])

  const handleQuickReview = (product: Product) => {
    setQuickReviewData(product)
    setOpenQuickReview(true)
  }

  const handleSort = (value: string) => {
    setSortValue(value)
  }

  const productElements = useMemo(
    () =>
      products &&
      products.map((product, index) => {
        return <ProductItem className="swiper-slide" key={index} product={product} page={page} onQuickReview={handleQuickReview} />
      }),
    [page, products]
  )

  const sortElement = useMemo(() => {
    return (
      <CustomForm schema={sortSchema}>
        <SelectField name="sort" options={sortOptions} defaultValue={sortValue} inputClassName="h-10" showErrorMessage={false} onInputChange={handleSort} />
      </CustomForm>
    )
  }, [])

  return (
    <div className={classNames(styles.list, [styles[page]])}>
      <div className={styles.list__heading}>
        {title && <h3 className={styles.list__title}>{title}</h3>}
        <div className={styles.list__heading__actions}>
          {isShowSort && <div className={styles.list__sort}>{sortElement}</div>}
          {isShowFilter && (
            <div className={styles.list__filter} onClick={() => setOpenModal(true)}>
              Filter <Image src={'/images/icons/filter.svg'} width={20} height={20} alt="filter" />
            </div>
          )}
        </div>
      </div>
      <div id="productList" className={styles.list__products}>
        <div className={classNames('swiper-wrapper', styles.list__wrapper, spCarousel ? [styles['carousel']] : [styles['normal']])}>{productElements}</div>
        {spCarousel && (
          <>
            <div className={classNames('swiper-button-next', styles.list__navigation, styles.list__navigation__next)} />
            <div className={classNames('swiper-button-prev', styles.list__navigation, styles.list__navigation__prev)} />
          </>
        )}
      </div>
      <FilterModal open={openModal} attributes={attributes} defaultFilterData={defaultFilterData} onClose={() => setOpenModal(false)} onClearFilter={onClearFilter} />
      {/* <QuickReviewModal open={openQuickReview} data={quickReviewData} onClose={() => setOpenQuickReview(false)} /> */}
    </div>
  )
}
