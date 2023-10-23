import Image from 'next/image'

import classNames from 'classnames'

import styles from '@/styles/layout/social.module.scss'

type Props = {
  className?: string
}

export default function Social({ className }: Props) {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <h3>Follow us on</h3>
      <ul>
        <li>
          <a href="">
            <Image src={'/images/icons/facebook.svg'} width={32} height={32} alt="facebook" />
          </a>
        </li>
        <li>
          <a href="">
            <Image src={'/images/icons/instagram.svg'} width={32} height={32} alt="instagram" />
          </a>
        </li>
        <li>
          <a href="">
            <Image src={'/images/icons/linkedin.svg'} width={32} height={32} alt="linkedin" />
          </a>
        </li>
      </ul>
    </div>
  )
}
