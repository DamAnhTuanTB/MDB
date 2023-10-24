import { useEffect, useMemo } from 'react'

import Image from 'next/image'

import classNames from 'classnames'

import initCarousel, { Options } from '@/services/carousel'

import styles from '@/styles/modules/product/carousel.module.scss'
import { ProductImage } from '@/types/product'

type Props = {
  images: ProductImage[]
}

export default function ImageCarousel({ images }: Props) {
  const defaultIndex = images && images.findIndex((img) => img.isDefault)
  if (defaultIndex !== -1) {
    const defaultImage = images.splice(defaultIndex, 1)[0]
    images.unshift(defaultImage)
  }

  useEffect(() => {
    const thumbOptions: Options = {
      spaceBetween: 12,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      updateOnWindowResize: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    const thumbCarousel = initCarousel('#thumbCarousel', thumbOptions)

    const mainOptions: Options = {
      slidesPerView: 1,
      thumbs: {
        swiper: thumbCarousel
      }
    }
    const mainCarousel = initCarousel('#mainCarousel', mainOptions)

    return () => {
      mainCarousel?.destroy()
      thumbCarousel?.destroy()
    }
  }, [])

  const imageElements = useMemo(
    () =>
      images &&
      images.length > 0 &&
      images.map((img) => (
        <div key={img.key} className={'swiper-slide'}>
          <Image loading="eager" src={img.url} width={600} height={600} alt={img.key} />
        </div>
      )),
    []
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div id="mainCarousel" className={classNames('swiper', styles.main)}>
          <div className="swiper-wrapper">{imageElements}</div>
        </div>
      </div>
      <div id="thumbCarousel" className={classNames('swiper', styles.thumb)}>
        <div className={classNames('swiper-wrapper', styles.thumb__wrapper)}>{imageElements}</div>
        <div className={classNames('swiper-button-next', styles.button, styles.button__next)} />
        <div className={classNames('swiper-button-prev', styles.button, styles.button__prev)} />
      </div>
    </div>
  )
}
