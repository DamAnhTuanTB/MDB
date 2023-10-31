import { useEffect, useRef, useState } from 'react'

import classNames from 'classnames'
//@ts-ignore
import intlTelInput from 'intl-tel-input'
import type { PhoneNumber } from 'libphonenumber-js'
import parsePhoneNumber from 'libphonenumber-js'
import { Controller, useFormContext } from 'react-hook-form'

import styles from '@/styles/modules/form.module.scss'
import { handleInputError } from '@/utils/helper'

import ErrorMessage from './error-message'

export type Props = Partial<React.InputHTMLAttributes<HTMLInputElement>> & {
  name: string
  label?: React.ReactNode
  required?: boolean
  showErrorMessage?: boolean
  className?: string
  inputClassName?: string
  boundaryClassName?: string
  isError?: boolean
  isLoading?: boolean
  onUpdate?: (value: PhoneNumber) => void
}

const TelField = ({
  name,
  label,
  showErrorMessage = false,
  placeholder,
  defaultValue,
  isError = false,
  className,
  inputClassName,
  boundaryClassName,
  required,
  isLoading = false,
  disabled,
  onUpdate,
  ...otherProps
}: Props) => {
  const { control, formState } = useFormContext()
  const hasError = handleInputError(name, formState.errors)
  const [error, setError] = useState<boolean>(isError)

  const currentRef = useRef<HTMLInputElement>(null)

  const phoneNumber = defaultValue ? parsePhoneNumber(defaultValue as string) : undefined

  const [number, setNumber] = useState<string>((phoneNumber?.nationalNumber as string) || '')
  const [countryCode, setCountryCode] = useState<string>(phoneNumber?.countryCallingCode || '1')

  useEffect(() => {
    const phoneString = parsePhoneNumber(`+${countryCode}${number}`)
    if (phoneString?.isPossible) {
      onUpdate && onUpdate(phoneString)
      setError(false)
    } else {
      setError(true)
    }
  }, [countryCode, number])

  useEffect(() => {
    const telInput = intlTelInput(currentRef.current, {
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js',
      initialCountry: phoneNumber?.country || 'US'
    })

    currentRef.current?.addEventListener('countrychange', function (e) {
      const code = telInput.getSelectedCountryData()
      setCountryCode(code.dialCode)
    })

    return () => {
      telInput.destroy()
    }
  }, [])

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
        defaultValue={phoneNumber?.formatNational()}
        render={({ field: { value, onChange, onBlur, ...fields } }) => (
          <div className={classNames(styles.input__boundary, boundaryClassName)}>
            <input
              {...fields}
              className={classNames(styles.input__field, { [styles['error']]: hasError || error }, inputClassName)}
              type="tel"
              onChange={(e) => {
                onChange(e)
                setNumber(e.target.value)
              }}
              value={value || ''}
              disabled={isLoading || disabled}
              ref={currentRef}
              {...otherProps}
            />
          </div>
        )}
      />
      {showErrorMessage && <ErrorMessage name={name} formState={formState} />}
    </div>
  )
}

export default TelField
