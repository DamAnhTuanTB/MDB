import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import classNames from 'classnames'

import { productApi } from '@/services/api/product'

import routes from '@/routes'
import styles from '@/styles/modules/product/detail.module.scss'

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
  console.log(detail)

  const breadCrumb: BreadcrumbItem[] = [{ label: 'Home', href: routes.homePage() }, { label: 'Sunscreen', href: routes.productPage() }, { label: detail.name }]

  return (
    <div className={classNames(styles.wrapper, 'container mx-auto')}>
      <div className={styles.breadcrumb}>
        <Breadcrumb items={breadCrumb} />
      </div>
      <ProductDetailComponent data={detail || {}} />
    </div>
  )
}
