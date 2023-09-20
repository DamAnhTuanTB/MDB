import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/layout/top-head.module.scss'

import Promotion from './promotion'

export default function TopHead() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.language}>
        <Image className={styles.language__icon} src="/images/icons/en.png" alt="en" width={25} height={25} />
        US (EN)
        <Image src="/images/icons/arrow.svg" alt="arrow" width={24} height={24} />
      </div>
      <div className={styles.promotion}>
        <Promotion />
      </div>
      <Link className={styles.link} href={'/'}>
        <span className={styles.link__sp}>Affiliate? Click Here!</span>
        <span className={styles.link__pc}>Click here to become an affiliate</span>
      </Link>
    </div>
  )
}
