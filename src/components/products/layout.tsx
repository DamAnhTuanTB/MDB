import classNames from 'classnames'

import styles from '@/styles/modules/product/layout.module.scss'

type Props = {
  children: React.ReactNode
  sidebar: React.ReactNode
}
export default function Layout({ children, sidebar }: Props) {
  return (
    <div className={classNames('container mx-auto', styles.wrapper)}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
