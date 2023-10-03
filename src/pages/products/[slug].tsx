import classNames from 'classnames'

import routes from '@/routes'
import styles from '@/styles/modules/product/detail.module.scss'

import Breadcrumb, { BreadcrumbItem } from '@/components/common/breadcrumb'
import ProductDetailComponent from '@/components/products/detail'

export default function ProductDetailPage() {
  const breadCrumb: BreadcrumbItem[] = [{ label: 'Home', href: routes.homePage() }, { label: 'Sunscreen', href: routes.productPage() }, { label: 'EltaMD UV Lotion Broad-Spectrum SP 30+' }]

  return (
    <div className={classNames(styles.wrapper, 'container mx-auto')}>
      <Breadcrumb items={breadCrumb} />
      <ProductDetailComponent />
    </div>
  )
}
