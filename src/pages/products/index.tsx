import { useEffect, useState } from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { productApi } from '@/services/api/product'

import { useProduct } from '@/hooks/pages/use-product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { Product, ProductFilter } from '@/types/product'
import { ProductAttributeItem } from '@/types/product/attribute'

import Meta from '@/components/common/meta'
import { ProductType } from '@/components/common/product/item'
import ProductComponent from '@/components/products'

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

export const getServerSideProps = (async () => {
  const response = await productApi.getAttributes()

  return { props: { productAttributes: response.data.results || [] } }
}) satisfies GetServerSideProps<{
  productAttributes: ProductAttributeItem[]
}>

export default function ProductPage({ productAttributes }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { getProductList, productList } = useProduct()
  const [products, setProducts] = useState<Product[]>(productList?.results || [])
  const [filterParams, setFilterParams] = useState<ProductFilter>({} as ProductFilter)
  const { query, updateQueryParams } = useRouterWithQueryParams()

  useEffect(() => {
    setFilterParams({ ...query })
  }, [])

  console.log(filterParams)

  const handleFilter = (value: ProductFilter) => {
    console.log('handleFilter')
    console.log(value)

    setFilterParams(value)
    updateQueryParams(value)
  }

  return (
    <>
      <Meta title="Products" />
      <ProductComponent products={products} attributes={productAttributes} />
    </>
  )
}
