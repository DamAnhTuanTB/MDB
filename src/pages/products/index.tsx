import Meta from '@/components/common/meta'
import ProductComponent from '@/components/products'
import { ProductType } from '@/components/single-product/item'

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

export default function ProductPage() {
  return (
    <>
      <Meta title="Products" />
      <ProductComponent products={prodcuts} />
    </>
  )
}
