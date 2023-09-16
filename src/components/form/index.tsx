import { ReactElement, useEffect } from 'react'

import { FieldErrors, FieldValues, FormProvider, UseFormReturn } from 'react-hook-form'
import { ZodType } from 'zod'

import { FormOptions, useCustomForm } from '@/hooks/use-custom-form'

interface Props<T extends FieldValues> {
  children: ReactElement
  provider?: UseFormReturn<T>
  schema?: ZodType<T>
  options?: FormOptions<T>
  onSubmit?: (data: T) => void
  onError?: (errors: FieldErrors) => void
  onPending?: (isPending: boolean) => void
}

export default function CustomForm<T extends FieldValues = FieldValues>({ children, schema, provider, options, onSubmit, onError, onPending }: Props<T>) {
  const { form } = useCustomForm<T>(schema, options)
  const formInstance = provider || form
  const {
    handleSubmit,
    formState: { errors, isValid }
  } = formInstance

  const submit = (data: T) => {
    onSubmit && onSubmit(data)
  }

  useEffect(() => {
    if (!onPending) return
    onPending(!isValid)
  }, [isValid, onPending])

  useEffect(() => {
    if (!onError || Object.keys(errors).length === 0) return
    onError(errors)
  }, [errors, onError])

  return (
    <FormProvider {...formInstance}>
      <form noValidate onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
        {children}
      </form>
    </FormProvider>
  )
}
