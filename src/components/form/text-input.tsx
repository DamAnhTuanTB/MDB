import classNames from 'classnames'
import { Controller, useFormContext } from 'react-hook-form'

import { handleInputError } from '@/utils/helper'

import ErrorMessage from './error-message'

import styles from '@/styles/modules/form-input.module.scss'

type Props = Partial<React.InputHTMLAttributes<HTMLInputElement>> & {
  name: string
  label?: string
  icon?: React.ReactNode
  showErrorMessage?: boolean
  className?: string
  inputClassName?: string
  inptuId?: string
  inputRef?: any
  isError?: boolean
  sizes?: 'small' | 'medium' | 'large'
  onInputChange?: (value: string) => void
}

const TextInput = ({
  name,
  label,
  icon,
  showErrorMessage = true,
  placeholder,
  sizes = 'medium',
  type = 'text',
  defaultValue,
  isError = false,
  className,
  inputClassName,
  inptuId,
  inputRef,
  onInputChange,
  ...otherProps
}: Props) => {
  const { control, formState } = useFormContext()
  const hasError = handleInputError(name, formState.errors)

  return (
    <div className={classNames(styles.formInput, className)}>
      {label && <span className={classNames(styles.formInput__label, { [styles['error']]: hasError })}>{label}</span>}
      {icon && <div className={classNames(styles.formInput__icon, { [styles['error']]: hasError })}>{icon}</div>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, onBlur, ...fields } }) => (
          <div className={styles.formInput__input__boundary}>
            <input
              id={inptuId}
              className={classNames(styles.formInput__input, styles[sizes], { [styles['error']]: hasError || isError }, inputClassName)}
              type={type}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e)
                onInputChange && onInputChange(e.target.value)
              }}
              value={value || ''}
              {...fields}
              {...otherProps}
              ref={inputRef}
            />
          </div>
        )}
      />
      {showErrorMessage && <ErrorMessage name={name} formState={formState} />}
    </div>
  )
}

export default TextInput
