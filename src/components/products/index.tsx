import { useState } from 'react'

import { productConfigs } from '@/configs/product'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import { DefaultFilterData, Product } from '@/types/product'
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
  defaultFilterData: DefaultFilterData
}

export default function ProductComponent({ products, attributes, totalCount = 0, defaultFilterData }: Props) {
  const { push, updateQueryParams } = useRouterWithQueryParams()
  const [clearAllFilter, setClearAllFilter] = useState<boolean>(false)

  const breadcrumbItems: BreadcrumbItem[] = [{ label: 'Home', href: routes.homePage() }, { label: 'Sunscreen' }]
  const handleClearAllFilter = () => {
    updateQueryParams(undefined)
    push(routes.productPage())
    setClearAllFilter(true)
  }

  return (
    <Layout sidebar={<Filter attributes={attributes} defaultData={defaultFilterData} clearAllFilter={clearAllFilter} onClearFilter={handleClearAllFilter} />}>
      <Breadcrumb items={breadcrumbItems} />
      <ProductList
        isShowSort
        isShowFilter
        products={products}
        attributes={attributes}
        defaultFilterData={defaultFilterData}
        title="Sunscreen Products"
        page="products"
        onClearFilter={handleClearAllFilter}
      />
      <Pagination itemsPerPage={productConfigs.limit} totalCount={totalCount} />
    </Layout>
  )
}
