import { zodResolver } from '@hookform/resolvers/zod'
import { ArrayPath, FieldValues, useFieldArray, UseFieldArrayReturn, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { ZodSchema } from 'zod'

export type FormOptions<T extends FieldValues> = {
  fieldArray?: ArrayPath<T>
} & UseFormProps<T>

type ReturnType<T extends FieldValues> = {
  form: UseFormReturn<T>
  formArray: UseFieldArrayReturn<T, ArrayPath<T>, 'id'>
}

export function useCustomForm<T extends FieldValues>(schema?: ZodSchema<T>, options?: FormOptions<T>): ReturnType<T> {
  const form = useForm<T>({
    resolver: schema ? zodResolver(schema) : undefined,
    mode: options?.mode || 'all',
    reValidateMode: options?.reValidateMode || 'onSubmit',
    ...options
  })

  const formArray = useFieldArray<T>({
    name: options?.fieldArray as ArrayPath<T>,
    control: form.control
  })

  return {
    form,
    formArray
  }
}
