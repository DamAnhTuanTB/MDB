import { useEffect } from 'react'

import { InferGetServerSidePropsType } from 'next'

import { productApi } from '@/services/api/product'

import { productConfigs } from '@/configs/product'
import { useProduct } from '@/hooks/pages/use-product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { ProductParams } from '@/types/product'
import { debounce } from '@/utils/helper'

import Meta from '@/components/common/meta'
import ProductComponent from '@/components/products'

export const getServerSideProps = async () => {
  const [productAttributes, filterData] = await Promise.all([productApi.getAttributes(), productApi.getDefaultFilterData()])

  return {
    props: {
      productAttributes: productAttributes.data?.results || [],
      defaultFilterData: filterData.data || {}
    }
  }
}

export default function ProductPage({ productAttributes, defaultFilterData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { getProductList, productList } = useProduct()
  const { query } = useRouterWithQueryParams()

  useEffect(() => {
    const { page, limit, sort, ...otherQuery } = query

    const params: any = {
      page: Number(page) || 1,
      limit: limit || productConfigs.limit,
      where: {
        ...otherQuery,
        attributeIds: query.attributeIds ? (typeof query.attributeIds === 'string' ? [query.attributeIds] : query.attributeIds) : []
      }
    }

    if (query.hasOwnProperty('sort') && query.sort) {
      const [key, value] = (query.sort as string).split(':')
      params.sort = {
        [key]: value
      }
    }

    // get products if query change after 1000ms
    debounce(1000)(getProductList, params as ProductParams)
  }, [query])

  return (
    <>
      <Meta title="Products" />
      <ProductComponent products={productList?.results || []} totalCount={productList?.count} attributes={productAttributes} defaultFilterData={defaultFilterData} />
    </>
  )
}
