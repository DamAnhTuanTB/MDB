import Meta from '@/components/common/meta'
import HomeComponent from '@/components/home'
import { HomeCarouselType } from '@/components/home/carousel'
import { ProductType } from '@/components/single-product/item'

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
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 5,
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 1,
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 3,
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 4,
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 5,
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 1,
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
  },
  {
    slug: '/products/eltamd-uv-clear-broad-spectrum-spf-46',
    img: '/images/product.png',
    name: 'EltaMD UV Clear Broad-Spectrum SPF 46',
    isFavorite: true,
    rating: 3,
    price: '$44',
    brand: 'EltaMD',
    reviewCount: 75,
    isInStock: true,
    sku: '02287',
    description: '<p>Have your fun in the sun—but play it safe. This sunscreen is great for swimmers, skiers, runners, golfers and other athletes.</p>'
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
