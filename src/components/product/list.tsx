import { useEffect, useMemo, useRef } from 'react'

import classNames from 'classnames'
import { debounce } from 'lodash'
import Swiper from 'swiper'

import initCarousel, { Options } from '@/services/carousel'

import styles from '@/styles/modules/product.module.scss'

import ProductItem, { ProductType } from './item'

type Props = {
  title?: string
  products: ProductType[]
}

export default function ProductList({ products, title }: Props) {
  const carousel = useRef<Swiper>()

  useEffect(() => {
    const options: Options = {
      spaceBetween: 16,
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      // autoplay: {
      //   delay: 3000
      // },
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
      if (window.innerWidth < 640) {
        carousel.current = initCarousel('#productList', options)
      } else {
        if (carousel.current) {
          carousel.current.destroy()
        }
      }
    }

    init()
    window.addEventListener('resize', debounce(init, 30))
  }, [])

  const productElements = useMemo(
    () =>
      products &&
      products.map((product, index) => {
        return <ProductItem className="swiper-slide" key={index} product={product} />
      }),
    []
  )

  return (
    <div className={styles.list}>
      <div className="container mx-auto">
        {title && <h3 className={styles.list__title}>{title}</h3>}
        <div id="productList" className={styles.list__products}>
          <div className={classNames('swiper-wrapper', styles.list__wrapper)}>{productElements}</div>
          <div className={classNames('swiper-button-next', styles.list__navigation, styles.list__navigation__next)} />
          <div className={classNames('swiper-button-prev', styles.list__navigation, styles.list__navigation__prev)} />
        </div>
      </div>
    </div>
  )
}
