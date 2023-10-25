import styles from '@/styles/modules/home/index.module.scss'
import { Banner } from '@/types/home/banner'
import { Product } from '@/types/product'

import ProductList from '../common/product/list'

import KvCarousel from './carousel'
import Clients from './clients'

type Props = {
  banners: Banner[]
  products: Product[]
  featuredProductTitle: string
}

export default function HomeComponent({ banners, products, featuredProductTitle }: Props) {
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
