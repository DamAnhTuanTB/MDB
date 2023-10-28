import { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from 'react'

import Image from 'next/image'

import classNames from 'classnames'

import styles from '@/styles/modules/button.module.scss'

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
  isLoading?: boolean
  disabled?: boolean
  variant?: 'blue' | 'ocean' | 'teal' | 'outlined' | 'filled'
}

export default function Button({ children, className, type, variant = 'blue', disabled = false, isLoading = false, ...otherProps }: Props) {
  const iconType = useMemo(() => (variant === 'blue' ? 'white' : 'blue'), [variant])

  return (
    <button type={type || 'button'} className={classNames(styles.button, styles[variant], { [styles.disabled]: disabled }, className)} {...otherProps} disabled={disabled}>
      {children}
      {isLoading && <Image src={`/images/icons/loading_${iconType}.svg`} width={20} height={20} alt="loading" />}
    </button>
  )
}
