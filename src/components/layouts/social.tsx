import { memo, useMemo } from 'react'

import Image from 'next/image'

import classNames from 'classnames'

import styles from '@/styles/layout/social.module.scss'
import { MediaIcon } from '@/types/footer'

type Props = {
  icons: MediaIcon[]
  className?: string
}

function Social({ icons, className }: Props) {
  const iconElements = useMemo(
    () =>
      icons &&
      icons.map((item) => (
        <li key={item.id}>
          <a href={item.urlLink} target="_blank">
            <Image src={item.imageUrl} width={32} height={32} alt={item.name} />
          </a>
        </li>
      )),
    [icons]
  )

  return (
    <div className={classNames(styles.wrapper, className)}>
      <h3>Follow us on</h3>
      <ul>{iconElements}</ul>
    </div>
  )
}

export default memo(Social)
