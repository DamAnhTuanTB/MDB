import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/button.module.scss'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
}

export default function Button({ children, className, type, ...otherProps }: Props) {
  return (
    <button type={type || 'button'} className={classNames(styles.button, className)} {...otherProps}>
      {children}
    </button>
  )
}
