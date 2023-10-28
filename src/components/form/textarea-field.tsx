import classNames from 'classnames'
import { Controller, useFormContext } from 'react-hook-form'

import styles from '@/styles/modules/form.module.scss'
import { handleInputError } from '@/utils/helper'

import ErrorMessage from './error-message'

export type Props = Partial<React.TextareaHTMLAttributes<HTMLTextAreaElement>> & {
  name: string
  label?: string
  required?: boolean
  showErrorMessage?: boolean
  className?: string
  inputClassName?: string
  inptuId?: string
  inputRef?: any
  isError?: boolean
  isLoading?: boolean
  onInputChange?: (value: string) => void
}

const TextAreaField = ({
  name,
  label,
  showErrorMessage = false,
  placeholder,
  defaultValue,
  isError = false,
  className,
  inputClassName,
  inptuId,
  inputRef,
  required,
  isLoading = false,
  disabled,
  onInputChange,
  ...otherProps
}: Props) => {
  const { control, formState } = useFormContext()
  const hasError = handleInputError(name, formState.errors)

  return (
    <div className={classNames(styles.input, className)}>
      {label && (
        <p className={classNames(styles.input__label, { [styles['error']]: hasError })}>
          {label}
          {required && <span className="text-red">*</span>}
        </p>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, onBlur, ...fields } }) => (
          <div className={styles.input__boundary}>
            <textarea
              {...fields}
              id={inptuId}
              className={classNames(styles.input__field, styles.input__textarea, { [styles['error']]: hasError || isError }, 'resize-none', inputClassName)}
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e)
                onInputChange && onInputChange(e.target.value)
              }}
              value={value || ''}
              ref={inputRef}
              disabled={isLoading || disabled}
              {...otherProps}
            />
          </div>
        )}
      />
      {showErrorMessage && <ErrorMessage name={name} formState={formState} />}
    </div>
  )
}

export default TextAreaField
