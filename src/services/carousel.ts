import Swiper, { Autoplay, Navigation, Pagination } from 'swiper'
import { SwiperOptions } from 'swiper/types'

Swiper.use([Autoplay, Navigation, Pagination])

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export type Options = SwiperOptions

export default function initCarousel(element: string, options: SwiperOptions) {
  return new Swiper(element, options)
}
