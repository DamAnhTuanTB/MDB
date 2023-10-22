import { ParsedUrlQuery } from 'querystring'

import { useEffect, useState } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import debounce from 'lodash/debounce'

import { categoryApi } from '@/services/api/category'
import { productApi } from '@/services/api/product'

import { productConfigs } from '@/configs/product'
import { useProduct } from '@/hooks/pages/use-product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { Product } from '@/types/product'

import Meta from '@/components/common/meta'
import ProductComponent from '@/components/products'

const getQuery = (query: ParsedUrlQuery, category: string) => {
  const { page, limit, sort, ...otherQuery } = query

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

export const getServerSideProps = async ({ params, query }: GetServerSidePropsContext) => {
  try {
    const categoryResponse = await categoryApi.getCategoryBySlug(params?.category as string)
    if (!categoryResponse.data?.id) {
      return {
        notFound: true
      }
    }

    const productParams = getQuery(query, categoryResponse?.data?.slug)

    const [productAttributeResponse, filterDataResponse, productResponse] = await Promise.all([productApi.getAttributes(), productApi.getDefaultFilterData(), productApi.getProducts(productParams)])

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

  const { getProductList, productList } = useProduct()
  const { query } = useRouterWithQueryParams()

  useEffect(() => {
    if (productList) {
      setDisplayProducts(productList?.results)
      setTotalCount(productList?.count || 0)
    }
  }, [productList])

  useEffect(() => {
    const productParams = getQuery(query, category?.slug)

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
