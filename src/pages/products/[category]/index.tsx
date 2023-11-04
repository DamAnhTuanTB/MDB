import { ParsedUrlQuery } from 'querystring'

import { useEffect, useState } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import { categoryApi } from '@/services/api/category'
import { productApi } from '@/services/api/product'

import { productConfigs } from '@/configs/product'
import { useProduct } from '@/hooks/pages/use-product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { Product } from '@/types/product'
import { debounce } from '@/utils/helper'

import Meta from '@/components/common/meta'
import ProductComponent from '@/components/products'

const getQuery = (query: ParsedUrlQuery) => {
  const { page, limit, sort, category, ...otherQuery } = query

  const params: any = {
    page: Number(page) || 1,
    limit: limit || productConfigs.limit,
    where: {
      ...otherQuery,
      attributeIds: query.attributeIds ? (typeof query.attributeIds === 'string' ? [query.attributeIds] : query.attributeIds) : [],
      categorySlug: category
    }
  }

  if (query.hasOwnProperty('sort') && query.sort) {
    const [key, value] = (query.sort as string).split(':')
    params.sort = {
      [key]: value
    }
  }

  return params
}

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  try {
    const categoryResponse = await categoryApi.getCategoryBySlug(query?.category as string)
    if (!categoryResponse.data?.id) {
      return {
        notFound: true
      }
    }

    const filterDataResponse = await productApi.getDefaultFilterData()

    const productParams = getQuery(query)

    productParams.where = {
      minPrice: query.minPrice || filterDataResponse?.data?.price?.min,
      maxPrice: query.maxPrice || filterDataResponse?.data?.price?.max
    }

    const [productAttributeResponse, productResponse] = await Promise.all([productApi.getAttributes(), productApi.getProducts(productParams)])

    return {
      props: {
        productAttributes: productAttributeResponse.data?.results || [],
        defaultFilterData: filterDataResponse.data || {},
        category: categoryResponse.data || {},
        products: productResponse.data || {}
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default function ProductPage({ productAttributes, defaultFilterData, category, products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products?.results || [])
  const [totalCount, setTotalCount] = useState<number>(products?.count || 0)
  const [isInitialRender, setIsInitialRender] = useState(true)

  const { getProductList, data: productList } = useProduct()
  const { query } = useRouterWithQueryParams()

  useEffect(() => {
    if (productList) {
      setDisplayProducts(productList?.results)
      setTotalCount(productList?.count || 0)
    }
  }, [productList])

  useEffect(() => {
    const productParams = getQuery(query)

    // get products if query change after 500ms
    const getProducts = debounce(() => {
      if (!isInitialRender) {
        getProductList(productParams)
      }
    }, 500)

    getProducts()
    setIsInitialRender(false)
  }, [query])

  return (
    <>
      <Meta title={`${category?.name} Products`} />
      <ProductComponent products={displayProducts || []} totalCount={totalCount} attributes={productAttributes} defaultFilterData={defaultFilterData} category={category} />
    </>
  )
}
