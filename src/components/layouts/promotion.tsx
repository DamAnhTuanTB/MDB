import { useEffect } from 'react'

import classNames from 'classnames'

import initCarousel, { Options } from '@/services/carousel'

import styles from '@/styles/layout/promotion.module.scss'

export default function Promotion() {
  useEffect(() => {
    const options: Options = {
      spaceBetween: 0,
      slidesPerView: 1,
      autoplay: {
        delay: 3000
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: 16
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }

    const carousel = initCarousel('#promotionSwipper', options)

    return () => carousel.destroy()
  }, [])

  return (
    <div className={styles.wrapper}>
      <div id="promotionSwipper" className={styles.carousel}>
        <div className="swiper-wrapper">
          <div className={classNames('swiper-slide', styles.carousel__slide)}>buy 5 items, get one item 50% off</div>
          <div className={classNames('swiper-slide', styles.carousel__slide)}>free shipping on orders over $75</div>
        </div>

        <div className={classNames('swiper-button-next', styles.carousel__next)} />
        <div className={classNames('swiper-button-prev', styles.carousel__prev)} />
      </div>
    </div>
  )
}
