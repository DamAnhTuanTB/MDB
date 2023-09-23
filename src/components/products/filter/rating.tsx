import classNames from 'classnames'

import styles from '@/styles/modules/product/sidebar.module.scss'

import Checkbox from '@/components/common/checkbox'
import RatingCommon from '@/components/common/rating'

type Props = {
  title: string
}

export default function Rating({ title }: Props) {
  const ratingElements = [5, 4, 3, 2, 1].map((num) => <Checkbox key={num} label={<RatingCommon score={num} />} />)

  return (
    <div className={styles.group}>
      <div className={styles.group__title}>{title}</div>
      <div className={classNames(styles.group__value, [styles['rating']])}>{ratingElements}</div>
    </div>
  )
}
