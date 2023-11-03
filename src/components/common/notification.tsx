import { useEffect } from 'react'

import classNames from 'classnames'
import { useRecoilState } from 'recoil'

import { notificationState } from '@/recoil/notification'
import styles from '@/styles/modules/notification.module.scss'

interface Props {
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
  className?: string
  duration?: number
}

export default function Notification({ message, type, className, duration = 4000 }: Props) {
  const [notification, setNotification] = useRecoilState(notificationState)

  useEffect(() => {
    if (message && type) {
      setNotification({ message, type })
    }
  }, [message, type, setNotification])

  const closeNotification = () => {
    setNotification(null)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null)
    }, duration)

    return () => {
      clearTimeout(timeout)
    }
  }, [notification, setNotification])

  if (notification) {
    const iconClassName = styles[`icon__${notification.type}`]

    return (
      <div className={classNames(styles.notification, styles[notification.type], className)}>
        <div className={styles.icon}>{iconClassName && <div className={iconClassName} />}</div>
        {notification.message}
        <div className={styles.close} onClick={closeNotification} />
      </div>
    )
  } else {
    return null
  }
}
