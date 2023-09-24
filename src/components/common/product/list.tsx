import { useEffect, useMemo, useRef, useState } from 'react'

import Image from 'next/image'

import classNames from 'classnames'
import { debounce } from 'lodash'
import Swiper from 'swiper'

import initCarousel, { Options } from '@/services/carousel'

import configs from '@/configs'
import styles from '@/styles/modules/product/index.module.scss'

import CustomForm from '@/components/form'
import SelectField, { SelectOption } from '@/components/form/select-field'
import FilterModal from '@/components/products/filter/filter-modal'

import ProductItem, { ProductType } from './item'
import QuickReviewModal from './quick-review-modal'

type Props = {
  title?: string
  products: ProductType[]
  spCarousel?: boolean
  page?: string
  isShowSort?: boolean
  isShowFilter?: boolean
}

export default function ProductList({ products, title, spCarousel = false, isShowSort = false, isShowFilter = false, page = '' }: Props) {
  const carousel = useRef<Swiper>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openQuickReview, setOpenQuickReview] = useState<boolean>(false)
  const [quickReviewData, setQuickReviewData] = useState<ProductType>()

  const sortOptions: SelectOption[] = [{ label: 'Sort', value: '' }]

  useEffect(() => {
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
          carousel.current.destroy()
        }
      }
    }

    if (spCarousel) {
      init()
      window.addEventListener('resize', debounce(init, 30))
    }
  }, [])

  const handleQuickReview = (product: ProductType) => {
    setQuickReviewData(product)
    setOpenQuickReview(true)
  }

  const productElements = useMemo(
    () =>
      products &&
      products.map((product, index) => {
        return <ProductItem className="swiper-slide" key={index} product={product} page={page} onQuickReview={handleQuickReview} />
      }),
    []
  )

  const sortElement = useMemo(() => {
    return (
      <CustomForm>
        <SelectField name="sort" options={sortOptions} inputClassName="h-10" />
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
      <FilterModal open={openModal} onClose={() => setOpenModal(false)} />
      <QuickReviewModal open={openQuickReview} data={quickReviewData} onClose={() => setOpenQuickReview(false)} />
    </div>
  )
}
