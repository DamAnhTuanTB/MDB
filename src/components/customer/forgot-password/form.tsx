import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { ZodType, z } from 'zod'

import { validates } from '@/configs/validate'
import { useCustomerForgotPassword } from '@/hooks/pages/use-customer-forgot-password'
import styles from '@/styles/modules/customer/form.module.scss'
import { ForgotPasswordBody } from '@/types/authentication'

import Button from '@/components/common/button'
import CustomForm from '@/components/form'
import TextField from '@/components/form/text-field'

const schema = z.object({
  email: z.string().refine((value) => validates.email.pattern.test(value), validates.email.message)
}) satisfies ZodType<ForgotPasswordBody>

export default function ForgotPasswordForm() {
  const { fetch, isLoading, data, errorMessage } = useCustomerForgotPassword()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    if (data) setIsSuccess(true)
  }, [data])

  const handleSubmitForm = (data: ForgotPasswordBody) => {
    fetch(data)
  }

  return (
    <div className={styles.wrapper}>
      <h4 className={classNames(styles.title, 'text-center')}>Forgot password</h4>
      {errorMessage && <p className={classNames(styles.description, 'text-red')}>{errorMessage}</p>}
      {isSuccess ? (
        <p className="mt-10 text-lg text-center">Please check your email to reset password!</p>
      ) : (
        <CustomForm schema={schema} onSubmit={handleSubmitForm}>
          <div className={styles.form}>
            <div className={styles.form__field}>
              <TextField showErrorMessage required label="Email" name="email" placeholder="example@email.com" type="email" isLoading={isLoading} isError={!!errorMessage} />
            </div>
            <Button type="submit" className={styles.form__button} isLoading={isLoading}>
              Send
            </Button>
          </div>
        </CustomForm>
      )}
    </div>
  )
}
