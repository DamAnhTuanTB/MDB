import { useEffect, useMemo, useRef, useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames'
import Swiper from 'swiper'
import { z } from 'zod'

import initCarousel, { Options } from '@/services/carousel'

import { sortOptions } from '@/constants/product'
import { useAccountInformation } from '@/hooks/pages/use-account-information'
import { useCart } from '@/hooks/use-cart'
import useDevice from '@/hooks/use-device'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useCartStore } from '@/recoil/cart'
import styles from '@/styles/modules/product/index.module.scss'
import { CartItem } from '@/types/cart'
import { DefaultFilterData, Product } from '@/types/product'
import { ProductAttributeItem } from '@/types/product/attribute'
import { ProductCategory } from '@/types/product/category'
import { debounce } from '@/utils/helper'

import ModalAddCartSuccess from '@/components/cart/modal-add-cart-success'
import CustomForm from '@/components/form'
import SelectField from '@/components/form/select-field'
import FilterModal from '@/components/products/filter/filter-modal'

import ProductItem from './item'
import QuickReviewModal from './quick-review-modal'

const sortSchema = z.object({
  sort: z.string().optional()
})

type Props = {
  title?: string
  products: Product[]
  category?: ProductCategory
  spCarousel?: boolean
  page?: string
  isShowSort?: boolean
  isShowFilter?: boolean
  clearFilter?: boolean
  attributes?: ProductAttributeItem[]
  defaultFilterData?: DefaultFilterData
  onClearFilter?: () => void
}

export default function ProductList({
  products,
  category,
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
  const [dataModalAddCartSuccess, setDataModalAddCartSuccess] = useState<CartItem>()
  const [sortValue, setSortValue] = useState<string>(() => {
    if (!query.sort) {
      delete query.sort
      return ''
    }
    return query.sort as string
  })

  const { profile } = useAccountInformation()
  const { addCart } = useCart()
  const { cart } = useCartStore()

  const { isMobile } = useDevice()

  useEffect(() => {
    // if (!query.sort) setSortValue('')
    // delete query.sort
    // updateQueryParams({ ...(query as any) })
  }, [query])

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
        if (isMobile) {
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
  }, [isMobile, spCarousel])

  useEffect(() => {
    if (clearFilter) setSortValue('')
  }, [clearFilter])

  useEffect(() => {
    const params: any = {
      ...query
    }
    if (isShowSort) params.sort = sortValue
    if (query.hasOwnProperty('page') && query.page) params.page = 1

    updateQueryParams(params)
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
        const prod = {
          productId: product?.id,
          quantity: 1,
          product: { ...product }
        }
        return <ProductItem className="swiper-slide" key={index} product={product || {}} page={page} category={category} onQuickReview={handleQuickReview} />
      }),
    [category, page, products]
  )

  const sortElement = useMemo(() => {
    return (
      <CustomForm schema={sortSchema}>
        <SelectField name="sort" options={sortOptions} value={sortValue} inputClassName="h-10" showErrorMessage={false} onInputChange={handleSort} />
      </CustomForm>
    )
  }, [sortValue])

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
      <FilterModal open={openModal} attributes={attributes || []} defaultFilterData={defaultFilterData} onClose={() => setOpenModal(false)} onClearFilter={onClearFilter} />
      {(quickReviewData && openQuickReview) && <QuickReviewModal open={openQuickReview} data={quickReviewData} onClose={() => setOpenQuickReview(false)} />}
      <ModalAddCartSuccess />
    </div>
  )
}
