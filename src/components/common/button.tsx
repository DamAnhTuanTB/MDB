import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import classNames from 'classnames'

import styles from '@/styles/modules/button.module.scss'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
  variant?: 'blue' | 'ocean' | 'teal'
}

export default function Button({ children, className, type, variant = 'blue', ...otherProps }: Props) {
  return (
    <button type={type || 'button'} className={classNames(styles.button, styles[variant], className)} {...otherProps}>
      {children}
    </button>
  )
}
