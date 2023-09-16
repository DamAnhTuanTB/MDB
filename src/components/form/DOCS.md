# Custom form

- Use [react-hook-form](https://react-hook-form.com/) to create flexible form with [zod resolver](https://www.npmjs.com/package/@hookform/resolvers)
- Use [zod](https://zod.dev/) to define schema validation

## Components

- Hooks: `use-custom-form`
- Form wrapper: `CustomForm`

# Usage

## Hooks

Create a new custom form with `schema` validation and `zodResolver`

### Input

| Input                | Description                                                                              | Type          |
| -------------------- | ---------------------------------------------------------------------------------------- | ------------- |
| `schema`             | schema validation by [zod](https://zod.dev/)                                             | `ZodSchema`   |
| `options`            | custom form input options, see more [here](https://react-hook-form.com/ts/#UseFormProps) | `FormOptions` |
| `options.fieldArray` | working with Field Arrays (dynamic form)                                                 | `ArrayPath`   |

### Output

| Input       | Description  | Type                  |
| ----------- | ------------ | --------------------- |
| `form`      | Basic form   | `UseFormReturn`       |
| `fromArray` | Dynamic form | `UseFieldArrayReturn` |

Basic form

```ts
import useCustomForm from '@/hooks/use-custom-form'
import { ZodType } from 'zod'

type Data = {
  title: string
  date: Date
}

const schema = z.object({
  name: z.string(),
  date: z.date()
}) satisfies ZodType<Data>

const { form } = useCustomForm(schema)
```

Dynamic form

```ts
import useCustomForm from '@/hooks/use-custom-form'
import { ZodType } from 'zod'

type User = {
  name: string
  age: number
}

type Users = Record<'users', User[]>

const schema = z.object({
  users: z.array(
    z.object({
      name: z.string(),
      age: z.number()
    })
  )
}) satisfies ZodType<Users>

const { formArray } = useCustomForm(schema, { fieldArray: 'users' })
```

## Form wrapper

- React component
- Default validate on every input change

### Properties

```ts
type Props<T extends FieldValues> {
  children: ReactElement
  provider?: UseFormReturn<T>
  schema?: ZodType<T>
  onSubmit: (data: T) => void
  onError?: (errors: FieldErrors) => void
  onPending?: (isPending: boolean) => void
}
```

| Props       | Required? | Description                                                                                    | Type            |
| ----------- | --------- | ---------------------------------------------------------------------------------------------- | --------------- |
| `children`  | yes       | react child element                                                                            | `ReactElement`  |
| `provider`  | no        | the `form` returned from hooks                                                                 | `UseFormReturn` |
| `schema`    | no        | zod shcema                                                                                     | `ZodType`       |
| `onSubmit`  | no        | handle submit, performed when passed all validation, this function return form field value     | `Function`      |
| `onError`   | no        | handle error, performed when validate failed, this function return form field errors           | `Function`      |
| `onPending` | no        | handle pendding, performed when the form is not valid, this function return a boolean variable | `Function`      |

### Example:

#### With a schema

```tsx
const schema = z.object({
  name: z.string(),
  date: z.date()
}) satisfies ZodType<Data>

return (
  <CustomForm schema={schema}>
    <>
      {/*form fields, input, select, date picker...*/}
      <button type={'submit'}>submit</button>
    </>
  </CustomForm>
)
```

#### With a form returned from `useCustomForm` hooks

```tsx
const { form } = useCustomForm(schema)

return (
  <CustomForm provider={form}>
    <>
      {/*_form fields, input, select, date picker...*/}
      <button type={'submit'}>submit</button>
    </>
  </CustomForm>
)
```

## Fields

### Props

| Props              | Description                                                                                                                                                          | Type      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `name`             | `required`, use for input name and register to react hook form                                                                                                       | `string`  |
| `showErrorMessage` | `optional`, if `true` error message will be show under the input if it's not valid, if `false` not show error message, input only has red border when it's not valid | `boolean` |
| ... input props    | `optional`, all MUI material input field props                                                                                                                       |           |

Demo all fields [here](../src/pages/form-demo.tsx)
