import { useEffect, useState } from 'react'

import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import classNames from 'classnames'

import { productApi } from '@/services/api/product'

import { useProduct } from '@/hooks/pages/use-product'
import routes from '@/routes'
import styles from '@/styles/modules/product/detail.module.scss'
import { Product } from '@/types/product'

import Breadcrumb, { BreadcrumbItem } from '@/components/common/breadcrumb'
import ProductDetailComponent from '@/components/products/detail'

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  try {
    const response = await productApi.getDetail(params?.slug as string)
    return {
      props: {
        detail: response.data
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default function ProductDetailPage({ detail }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { productList, getProductList } = useProduct()

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  const breadCrumb: BreadcrumbItem[] = [{ label: 'Home', href: routes.homePage() }, { label: 'Sunscreen', href: routes.productPage() }, { label: detail.name }]

  useEffect(() => {
    getProductList({
      page: 1,
      limit: 4,
      where: {
        relatedProductIds: [detail.id]
      }
    })
    setRelatedProducts(productList?.results || [])
  }, [productList])

  return (
    <div className={classNames(styles.wrapper, 'container mx-auto')}>
      <div className={styles.breadcrumb}>
        <Breadcrumb items={breadCrumb} />
      </div>
      <ProductDetailComponent data={detail || {}} relatedProducts={relatedProducts || []} />
    </div>
  )
}
