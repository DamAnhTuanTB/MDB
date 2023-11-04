import { useEffect, useMemo } from 'react'

import classNames from 'classnames'

import initCarousel, { Options } from '@/services/carousel'

import { useHomeStore } from '@/recoil/home'
import styles from '@/styles/layout/promotion.module.scss'
import { CONTENT_OPTIONS_KEY } from '@/types/global'
import { findObjectByName } from '@/utils/helper'

import HtmlRender from '../common/html-render'

export default function Promotion() {
  const { homeContent } = useHomeStore()

  const topNavContent = findObjectByName(homeContent, 'name', CONTENT_OPTIONS_KEY.TOP_NAVIGATION_BAR)?.value || ''
  const topNavArray = topNavContent.split('</p>')?.filter((item) => item)
  const carouselItems = useMemo(() => topNavArray.map((item, index) => <HtmlRender key={index} className={classNames('swiper-slide', styles.carousel__slide)} htmlString={item} />), [topNavArray])

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
        <div className={classNames('swiper-wrapper', { [styles.single]: topNavArray.length < 2 })}>{carouselItems}</div>

        <div className={classNames('swiper-button-next', styles.carousel__next)} />
        <div className={classNames('swiper-button-prev', styles.carousel__prev)} />
      </div>
    </div>
  )
}
