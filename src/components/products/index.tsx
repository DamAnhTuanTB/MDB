import Breadcrumb, { BreadcrumbItem } from '../common/breadcrumb'
import Pagination from '../common/pagination'
import { ProductType } from '../common/product/item'
import ProductList from '../common/product/list'

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
      <ProductList products={products} title="Sunscreen Products" size="small" />
      <Pagination itemsPerPage={10} totalCount={100} />
    </Layout>
  )
}
