import styles from '@/styles/modules/home/index.module.scss'
import { CONTENT_OPTIONS_KEY, ContentOptions } from '@/types/global'
import { Banner } from '@/types/home/banner'
import { Product } from '@/types/product'
import { findObjectByName } from '@/utils/helper'

import ProductList from '../common/product/list'

import KvCarousel from './carousel'
import Clients from './clients'

type Props = {
  banners: Banner[]
  products: Product[]
  contentOptions: ContentOptions[]
}

export default function HomeComponent({ banners, products, contentOptions }: Props) {
  const featuredProductTitle = findObjectByName(contentOptions, 'name', CONTENT_OPTIONS_KEY.FEATURED_PRODUCT_TITLE)?.value || ''

  return (
    <div className={styles.wrapper}>
      <KvCarousel slides={banners} />
      <div className="container mx-auto">
        <div className={styles.list}>
          <ProductList products={products} page="home" spCarousel title={featuredProductTitle || ''} />
        </div>
      </div>
      <Clients />
    </div>
  )
}
