import { useEffect } from 'react'

import classNames from 'classnames'

import { blockScroll, enableScroll } from '@/services/block-scroll'

import styles from '@/styles/modules/modal.module.scss'

type Props = {
  open: boolean
  onClose?: () => void
  children: React.ReactNode
}

export default function Modal({ open, children, onClose }: Props) {
  useEffect(() => {
    if (open) blockScroll(window.scrollY)
    else enableScroll()
  }, [open])

  return (
    <div className={classNames(styles.wrapper, { [styles['open']]: open })}>
      <div className={styles.overlay} />
      <div className={styles.body}>
        <div className={styles.body__close} onClick={onClose} />
        <div className={styles.body__content}>{children}</div>
      </div>
    </div>
  )
}
