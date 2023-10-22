import Swiper, { Autoplay, Navigation, Pagination, Thumbs } from 'swiper'
import { SwiperOptions } from 'swiper/types'

Swiper.use([Autoplay, Navigation, Pagination, Thumbs])

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export type Options = SwiperOptions

export default function initCarousel(element: string, options: SwiperOptions) {
  return new Swiper(element, options)
}
