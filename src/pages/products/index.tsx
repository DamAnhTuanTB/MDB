import { useEffect, useState } from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { productApi } from '@/services/api/product'

import { productConfigs } from '@/configs/product'
import { useProduct } from '@/hooks/pages/use-product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { ProductParams } from '@/types/product'
import { ProductAttributeItem } from '@/types/product/attribute'
import { debounce } from '@/utils/helper'

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
  const { query, updateQueryParams } = useRouterWithQueryParams()

  const [currentPage, setCurrentPage] = useState<number>(1)
  // useEffect(() => {
  //   updateQueryParams({ ...query, page: currentPage })
  // }, [currentPage])

  useEffect(() => {
    const { page, limit, ...otherQuery } = query
    // if (Number(page) === currentPage && Number(page) !== 1) setCurrentPage(1)
    // else setCurrentPage(Number(page))

    debounce(1000)(getProductList, {
      page: Number(page) || 1,
      limit: limit || productConfigs.limit,
      where: {
        ...otherQuery,
        attributeIds: query.attributeIds ? (typeof query.attributeIds === 'string' ? [query.attributeIds] : query.attributeIds) : []
      }
    } as ProductParams)
  }, [query])

  return (
    <>
      <Meta title="Products" />
      <ProductComponent products={productList?.results || []} totalCount={productList?.count} attributes={productAttributes} />
    </>
  )
}
