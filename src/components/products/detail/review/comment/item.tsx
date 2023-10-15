import styles from '@/styles/modules/product/review.module.scss'

import Button from '@/components/common/button'
import RatingCommon from '@/components/common/rating'

export type ReviewItemType = {
  score: number
  title: string
  name: string
  dateTime: string
  description: string
  status: string
}

type Props = {
  content: ReviewItemType
}

export default function CommentItem({ content }: Props) {
  return (
    <div className={styles.comment__item}>
      <div className={styles.comment__item__left}>
        <h3>{content.name}</h3>
        <h5 className="mt-4">{content.status}</h5>
      </div>
      <div className={styles.comment__item__right}>
        <RatingCommon score={content.score} />
        <h4 className="mt-4">{content.title}</h4>
        <h5 className="mt-2">{content.name}</h5>
        <p className="mt-2">{content.dateTime}</p>
        <p className="mt-6">{content.description}</p>
        <div className={styles.comment__item__buttons}>
          <Button variant={'filled'} className="!w-[137px]">
            Helpful
          </Button>
          <div className={styles.comment__item__buttons__divider}></div>
          <p>Report</p>
        </div>
      </div>
    </div>
  )
}
