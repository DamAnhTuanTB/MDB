import classNames from 'classnames'

import styles from '@/styles/modules/product/review.module.scss'

import ReviewComment from './comment'
import { ReviewItemType } from './comment/item'
import ReviewImage from './images'
import ReviewRating from './rating'

const comments: ReviewItemType[] = [
  {
    name: 'Victor C.',
    status: 'Verified Buyer ',
    title: 'Best Sunscreen Ever!',
    dateTime: '1 month ago',
    score: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: 'Victor C.',
    status: 'Verified Buyer ',
    title: 'Best Sunscreen Ever!',
    dateTime: '1 month ago',
    score: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
]

type Props = {
  className?: string
}

export default function Reviews({ className }: Props) {
  return (
    <div className={classNames(styles.review, className)}>
      <div className={styles.review__group}>
        <ReviewRating title="Reviews" score={5} />
        <ReviewImage title="Customer Images" />
      </div>
      <ReviewComment comments={comments} />
    </div>
  )
}
