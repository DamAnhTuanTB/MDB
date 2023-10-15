import { useMemo } from 'react'

import styles from '@/styles/modules/product/review.module.scss'

import Pagination from '@/components/common/pagination'

import Filter from './filter'
import CommentItem, { ReviewItemType } from './item'

type Props = {
  comments: ReviewItemType[]
}

export default function ReviewComment({ comments }: Props) {
  const commentElements = useMemo(() => comments.map((item, index) => <CommentItem key={index} content={item} />), [])

  return (
    <div className={styles.comment}>
      <Filter />
      <div className={styles.comment__list}>
        {commentElements}
        <p className={styles.comment__list__viewall}>View All Reviews</p>
      </div>
      <Pagination totalCount={50} className="!mt-10" />
    </div>
  )
}
