import { useMemo } from 'react'

import classNames from 'classnames'
import { Controller, useFormContext } from 'react-hook-form'

import styles from '@/styles/modules/form.module.scss'
import { handleInputError } from '@/utils/helper'

import ErrorMessage from '@/components/form/error-message'

export type SelectOption<T = string> = {
  label: string
  value: number
}

export type Props = Partial<React.InputHTMLAttributes<HTMLSelectElement>> & {
  name: string
  label?: React.ReactNode
  showErrorMessage?: boolean
  options?: SelectOption[]
  className?: string
  inputClassName?: string
  isLoading?: boolean
  onInputChange?: (value: string) => void
}

const SelectField = ({ name, label, showErrorMessage = true, placeholder, defaultValue, options, className, inputClassName, isLoading = false, disabled, onInputChange, ...otherProps }: Props) => {
  const { control, formState } = useFormContext()
  const hasError = handleInputError(name, formState.errors)

  const optionsElements = useMemo(() => {
    return (
      options &&
      options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))
    )
  }, [options])

  return (
    <div className={classNames(styles.input, className)}>
      {label && <span className={styles.input__label}>{label}</span>}
      <div className="relative w-full">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ''}
          render={({ field: { value, onChange, onBlur, ...others } }) => (
            <div className={classNames(styles.input__boundary, '!bg-grey-50')}>
              <select
                {...others}
                className={classNames(styles.input__field, { hasError: hasError }, inputClassName)}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e)
                  onInputChange && onInputChange(e.target.value)
                }}
                value={value || ''}
                disabled={isLoading || disabled}
                {...otherProps}
              >
                {optionsElements}
              </select>
            </div>
          )}
        />
        <svg className={styles.input__expend} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <g clipPath="url(#clip0_608_6976)">
            <path d="M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z" fill="#1F1F29" />
          </g>
          <defs>
            <clipPath id="clip0_608_6976">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {showErrorMessage && <ErrorMessage name={name} formState={formState} />}
    </div>
  )
}

export default SelectField
