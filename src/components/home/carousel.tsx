import { useEffect, useMemo } from 'react'

import classNames from 'classnames'

import initCarousel, { Options } from '@/services/carousel'

import { useGlobalSettingStore } from '@/recoil/global'
import styles from '@/styles/modules/home/carousel.module.scss'
import { Banner } from '@/types/home/banner'

import HtmlRender from '../common/html-render'

type Props = {
  slides: Banner[]
}

export default function KvCarousel({ slides }: Props) {
  const { isBannerAutoScroll } = useGlobalSettingStore()

  useEffect(() => {
    const options: Options = {
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      autoplay: isBannerAutoScroll
        ? {
            delay: 5000
          }
        : false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    }

    const carousel = initCarousel('#kvSwipper', options)

    return () => carousel.destroy()
  }, [])

  const slideElements = useMemo(
    () =>
      slides.map((slide, index) => (
        <div key={index} className={classNames('swiper-slide', styles.carousel__slide)}>
          <div className={styles.carousel__slide__bg} style={{ backgroundImage: `url(${slide.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} />
          {slide.description && (
            <div className={styles.carousel__slide__text}>
              <HtmlRender htmlString={slide.description || ''} />
              {slide.redirectUrl && slide.redirectButton && (
                <div className="text-center lg:text-right">
                  <a className={styles.carousel__slide__button} href={slide.redirectUrl}>
                    {slide.redirectButton}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )),
    [slides]
  )

  return (
    <div className={styles.wrapper}>
      <div id="kvSwipper" className={styles.carousel}>
        <div className="swiper-wrapper">{slideElements}</div>

        <div className={classNames('swiper-button-next', styles.carousel__navigation, styles.carousel__navigation__next)} />
        <div className={classNames('swiper-button-prev', styles.carousel__navigation, styles.carousel__navigation__prev)} />

        <div className={classNames('swiper-pagination', styles.carousel__pagination)} />
      </div>
    </div>
  )
}
