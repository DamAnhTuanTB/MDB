import styles from '@/styles/modules/product/review.module.scss'

import RatingCommon from '../../../common/rating'

type StarItemProps = {
  star: number
  percent: number
}

const StarItem = ({ star, percent }: StarItemProps) => {
  return (
    <div className={styles.star__item}>
      {star} Stars{' '}
      <div className={styles.star__item__percent}>
        <div style={{ width: `${percent}%` }} />
      </div>{' '}
      {percent}%
    </div>
  )
}

type Props = {
  title: string
  score: number
}

export default function ReviewRating({ title, score }: Props) {
  return (
    <div className={styles.rating}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.score}>
        <RatingCommon score={score} /> <span>4.7 out of 5 (75 reviews)</span>
      </div>
      <div className={styles.star}>
        <StarItem star={5} percent={75} />
        <StarItem star={4} percent={14} />
        <StarItem star={3} percent={8} />
        <StarItem star={2} percent={2} />
        <StarItem star={1} percent={1} />
      </div>
    </div>
  )
}
