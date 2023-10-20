import { useEffect, useMemo, useState } from 'react'

import classNames from 'classnames'

import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import styles from '@/styles/modules/product/sidebar.module.scss'

import Checkbox from '@/components/common/checkbox'
import RatingCommon from '@/components/common/rating'

type Props = {
  title?: string
  clearFilter?: boolean
}

export default function Rating({ title, clearFilter = false }: Props) {
  const { query, updateQueryParams } = useRouterWithQueryParams()
  const [rating, setRating] = useState<number | undefined>(Number(query.maxRating))

  useEffect(() => {
    if (clearFilter) setRating(undefined)
  }, [clearFilter])

  useEffect(() => {
    updateQueryParams({ ...query, maxRating: rating || '' })
  }, [rating])

  const toggleCheckbox = (checked: boolean, value: number) => {
    if (checked) setRating(value)
    else setRating(0)
  }

  const ratingElements = useMemo(
    () => [5, 4, 3, 2, 1].map((num) => <Checkbox key={num} label={<RatingCommon score={num} />} checked={num === rating} onChange={(checked) => toggleCheckbox(checked, num)} />),
    [rating]
  )

  return (
    <div className={classNames(styles.group, { '!mt-0': !title })}>
      {title && <div className={styles.group__title}>{title}</div>}
      <div className={classNames(styles.group__value, [styles['rating']], { '!pl-0 !mt-0': !title })}>{ratingElements}</div>
    </div>
  )
}
