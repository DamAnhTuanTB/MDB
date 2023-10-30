import { useEffect } from 'react'

import classNames from 'classnames'
import { FieldValues } from 'react-hook-form'
import { z } from 'zod'

import { validates } from '@/configs/validate'
import { useCustomerResetPassword } from '@/hooks/pages/use-customer-reset-password'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/customer/form.module.scss'

import Button from '@/components/common/button'
import CustomForm from '@/components/form'
import TextField from '@/components/form/text-field'

const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validates.confirmPassword.message,
    path: ['confirmPassword']
  })

export default function ResetPasswordForm() {
  const { fetch, isLoading, errorMessage, data } = useCustomerResetPassword()
  const { push, query } = useRouterWithQueryParams()

  useEffect(() => {
    if (!query.code || !query.email) push(routes.homePage())
  }, [])

  useEffect(() => {
    if (data) push(routes.loginPage())
  }, [data])

  const handleSubmitForm = (data: FieldValues) => {
    const { code, email } = query
    fetch({ password: data.password, code: code as string, email: email as string })
  }

  return (
    <div className={styles.wrapper}>
      <h4 className={classNames(styles.title, 'text-center')}>Reset password</h4>
      {errorMessage && <p className={classNames(styles.description, 'text-red')}>{errorMessage}</p>}
      <CustomForm schema={schema} onSubmit={handleSubmitForm}>
        <div className={styles.form}>
          <div className={styles.form__field}>
            <TextField showErrorMessage required label="New password" name="password" placeholder="New password" type="password" isLoading={isLoading} />
          </div>
          <TextField showErrorMessage required label="Confirm Password" name="confirmPassword" placeholder="Confirm password" type="password" isLoading={isLoading} />
          <Button type="submit" className={styles.form__button} isLoading={isLoading}>
            Send
          </Button>
        </div>
      </CustomForm>
    </div>
  )
}
