import { useMemo } from 'react'

import classNames from 'classnames'
import { Controller, useFormContext } from 'react-hook-form'

import { SelectOption } from '@/models'
import { handleInputError } from '@/utils/helper'

import ErrorMessage from '@/components/form/error-message'

import styles from '@/styles/modules/form-input.module.scss'

type Props = Partial<React.InputHTMLAttributes<HTMLSelectElement>> & {
  name: string
  label?: string
  showErrorMessage?: boolean
  options?: SelectOption[]
  className?: string
  inputClassName?: string
}

const CustomSelect = ({ name, label, showErrorMessage = true, placeholder, defaultValue, options, className, inputClassName, ...others }: Props) => {
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
    <div className={classNames(styles.formInput, className)}>
      {label && <span className={styles.formInput__label}>{label}</span>}
      <div className="relative w-full">
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { value, onChange, onBlur, ...otherProps } }) => (
            <div className={styles.formInput__input__boundary}>
              <select
                className={classNames(styles.formInput__input, { hasError: hasError }, inputClassName)}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e)
                }}
                value={value || ''}
                {...otherProps}
                {...others}
              >
                {optionsElements}
              </select>
            </div>
          )}
        />
        <svg className={styles.formInput__expend} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Expand_down">
            <path id="Vector 9" d="M16.6641 6.66634L9.9974 13.333L3.33073 6.66634" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
      {showErrorMessage && <ErrorMessage name={name} formState={formState} />}
    </div>
  )
}

export default CustomSelect
