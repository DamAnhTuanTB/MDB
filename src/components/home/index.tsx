import styles from '@/styles/modules/home/index.module.scss'
import { Banner } from '@/types/home/banner'
import { Product } from '@/types/product'

import ProductList from '../common/product/list'

import KvCarousel from './carousel'
import Clients from './clients'

type Props = {
  banners: Banner[]
  products: Product[]
}

export default function HomeComponent({ banners, products }: Props) {
  return (
    <div className={styles.wrapper}>
      <KvCarousel slides={banners} />
      <div className="container mx-auto">
        <div className={styles.list}>
          <ProductList products={products} page="home" spCarousel title="July 4th Selections" />
        </div>
      </div>
      <Clients />
    </div>
  )
}
