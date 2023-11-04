import classNames from 'classnames'

import styles from '@/styles/modules/modal.module.scss'

type Props = {
  open: boolean
  children: React.ReactNode
  className?: string
  bodyClassName?: string
  contentClassName?: string
  onClose?: () => void
}

export default function Modal({ open, children, className, bodyClassName, contentClassName, onClose }: Props) {
  // useEffect(() => {
  //   if (open) blockScroll(window.scrollY)
  //   else enableScroll()
  // }, [open])

  return (
    <div className={classNames(styles.wrapper, className, { [styles['open']]: open })}>
      <div className={styles.overlay} />
      <div className={classNames(styles.body, bodyClassName)}>
        <div className={styles.body__close} onClick={onClose} />
        <div className={classNames(styles.body__content, contentClassName)}>{children}</div>
      </div>
    </div>
  )
}
