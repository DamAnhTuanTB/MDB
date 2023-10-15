import Image from 'next/image'

import styles from '@/styles/modules/product/review.module.scss'

type Props = {
  title: string
}

export default function ReviewImage({ title }: Props) {
  return (
    <div className={styles.images}>
      <h3 className={styles.images__title}>{title}</h3>
      <div className={styles.images__wrapper}>
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
        <Image src={'/images/product.png'} width={100} height={100} alt="product" />
      </div>
    </div>
  )
}
