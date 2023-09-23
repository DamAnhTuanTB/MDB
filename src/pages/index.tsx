import Meta from '@/components/common/meta'
import { ProductType } from '@/components/common/product/item'
import HomeComponent from '@/components/home'
import { HomeCarouselType } from '@/components/home/carousel'

const slides: HomeCarouselType[] = [
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

const prodcuts: ProductType[] = [
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 4,
    price: '$44'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 3,
    price: '$44'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: false,
    rating: 4,
    price: '$44'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: false,
    rating: 5,
    price: '$44'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: false,
    rating: 4,
    price: '$44'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: false,
    rating: 3,
    price: '$44'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 4,
    price: '$44'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: false,
    rating: 5,
    price: '$44'
  }
]

export default function HomePage() {
  return (
    <>
      <Meta title="Home page" />
      <HomeComponent slides={slides} products={prodcuts} />
    </>
  )
}
