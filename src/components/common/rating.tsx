import { useMemo } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/rating.module.scss'

type Props = {
  score: number
}

export default function RatingCommon({ score }: Props) {
  const ratingElements = useMemo(() => [1, 2, 3, 4, 5].map((num) => <div key={num} className={classNames(styles.star, { [styles['active']]: num <= score })}></div>), [score])

  return <div className={styles.wrapper}>{ratingElements}</div>
}
