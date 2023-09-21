import styles from '@/styles/modules/home/index.module.scss'

import KvCarousel, { HomeCarouselType } from './carousel'
import Clients from './clients'

export default function HomeComponent() {
  const slideList: HomeCarouselType[] = [
    {
      img: '/images/home/carousel/slide1.jpg',
      description: '<h3>Memorial Day Sale!</h3><h3>25% off on all skincare products!*</h3>',
      link: {
        label: 'See All Deals',
        href: 'http://mydermbox.com'
      },
      note: '*offer applies to select products only'
    },
    {
      img: '/images/home/carousel/slide2.jpg',
      description: '<h3>Memorial Day Sale!</h3><h3>25% off on all skincare products!*</h3>',
      link: {
        label: 'See All Deals',
        href: 'http://mydermbox.com'
      }
    },
    {
      img: '/images/home/carousel/slide3.jpg',
      description: '<h3>Memorial Day Sale!</h3><h3>25% off on all skincare products!*</h3>',
      note: '*offer applies to select products only'
    }
  ]
  return (
    <div className={styles.wrapper}>
      <KvCarousel slides={slideList} />
      <Clients />
    </div>
  )
}
