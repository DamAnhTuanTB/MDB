import { useEffect, useMemo } from 'react'

import classNames from 'classnames'

import initCarousel, { Options } from '@/services/carousel'

import styles from '@/styles/modules/home/carousel.module.scss'

import HtmlRender from '../common/html-render'

export type HomeCarouselType = {
  img: string
  description?: string
  link?: {
    label: string
    href: string
  }
  note?: string
}

type Props = {
  slides: HomeCarouselType[]
}

export default function KvCarousel({ slides }: Props) {
  useEffect(() => {
    const options: Options = {
      spaceBetween: 0,
      slidesPerView: 1,
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

    const carousel = initCarousel('#kvSwipper', options)

    return () => carousel.destroy()
  }, [])

  const slideElements = useMemo(
    () =>
      slides.map((slide, index) => (
        <div key={index} className={classNames('swiper-slide', styles.carousel__slide)}>
          <div className={styles.carousel__slide__bg} style={{ backgroundImage: `url(${slide.img})`, backgroundSize: 'cover', backgroundPosition: 'center center' }} />
          <div className={styles.carousel__slide__text}>
            <HtmlRender htmlString={slide.description || ''} />
            {slide.link && (
              <div className="text-center">
                <a className={styles.carousel__slide__button} href={slide.link?.href}>
                  {slide.link?.label}
                </a>
              </div>
            )}
            {slide.note && <p className={styles.carousel__slide__note}>{slide.note}</p>}
          </div>
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
