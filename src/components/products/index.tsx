import Breadcrumb, { BreadcrumbItem } from '../common/breadcrumb'
import Pagination from '../common/pagination'
import { ProductType } from '../single-product/item'
import ProductList from '../single-product/list'

import Filter from './filter'
import Layout from './layout'

type Props = {
  products: ProductType[]
}

export default function ProductComponent({ products }: Props) {
  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, { label: 'Sunscreen' }]
  const handleFilter = () => {}

  return (
    <Layout sidebar={<Filter onFilter={handleFilter} />}>
      <Breadcrumb items={breadcrumbItems} />
      <ProductList isShowSort isShowFilter products={products} title="Sunscreen Products" page="products" />
      <Pagination itemsPerPage={10} totalCount={100} />
    </Layout>
  )
}
