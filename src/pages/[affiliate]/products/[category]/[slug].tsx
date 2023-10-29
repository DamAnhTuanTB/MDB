import { useEffect } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import classNames from 'classnames'

import { categoryApi } from '@/services/api/category'
import { productApi } from '@/services/api/product'

import { useProduct } from '@/hooks/pages/use-product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/product/detail.module.scss'

import Breadcrumb, { BreadcrumbItem } from '@/components/common/breadcrumb'
import Meta from '@/components/common/meta'
import ProductDetailComponent from '@/components/products/detail'

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  try {
    // Checking if category is exist
    const categoryResponse = await categoryApi.getCategoryBySlug(params?.category as string)
    if (!categoryResponse.data?.id) {
      return {
        notFound: true
      }
    }

    const detailResponse = await productApi.getDetail(params?.slug as string)
    return {
      props: {
        productDetail: detailResponse.data || {},
        category: categoryResponse.data || {}
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default function ProductDetailPage({ productDetail, category }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: productList, getProductList } = useProduct()
  const { query } = useRouterWithQueryParams()

  const breadCrumb: BreadcrumbItem[] = [
    { label: 'Home', href: routes.homePage() },
    { label: category?.name, href: routes.productPage(category?.slug, query.affiliate as string) },
    { label: productDetail?.name }
  ]

  useEffect(() => {
    getProductList({
      where: {
        relatedProductIds: [productDetail?.id]
      }
    })
  }, [])

  return (
    <>
      <Meta />
      <div className={classNames(styles.wrapper, 'container mx-auto')}>
        <div className={styles.breadcrumb}>
          <Breadcrumb items={breadCrumb} />
        </div>
        <ProductDetailComponent data={productDetail || {}} relatedProducts={productList?.results || []} />
      </div>
    </>
  )
}
