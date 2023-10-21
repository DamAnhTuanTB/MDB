import { productConfigs } from '@/configs/product'
import routes from '@/routes'
import { Product } from '@/types/product'
import { ProductAttributeItem } from '@/types/product/attribute'

import Breadcrumb, { BreadcrumbItem } from '../common/breadcrumb'
import Pagination from '../common/pagination'
import ProductList from '../common/product/list'

import Filter from './filter'
import Layout from './layout'

type Props = {
  products: Product[]
  totalCount?: number
  attributes: ProductAttributeItem[]
}

export default function ProductComponent({ products, attributes, totalCount = 0 }: Props) {
  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', href: routes.homePage() }, { label: 'Sunscreen' }]

  return (
    <Layout sidebar={<Filter attributes={attributes} />}>
      <Breadcrumb items={breadcrumbItems} />
      <ProductList isShowSort isShowFilter products={products} title="Sunscreen Products" page="products" />
      <Pagination itemsPerPage={productConfigs.limit} totalCount={totalCount} />
    </Layout>
  )
}
