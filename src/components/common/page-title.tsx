import styles from '@/styles/modules/page-title.module.scss'

type Props = {
  title: string
}

export default function PageTitle({ title }: Props) {
  return <h1 className={styles.title}>{title}</h1>
}
