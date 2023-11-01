import Image from 'next/image'

import styles from '@/styles/modules/home/client.module.scss'
import { Banner } from '@/types/home/banner'

type Props = {
  brands: Banner[]
}

export default function Clients({ brands }: Props) {
  const brandElements = brands.map((item) => <Image key={item.imageKey} src={item.imageUrl} width={218} height={125} alt={item.imageKey} />)

  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto">
        <div className={styles.content}>{brandElements}</div>
      </div>
    </div>
  )
}
