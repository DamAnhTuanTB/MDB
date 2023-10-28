import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { ZodType, z } from 'zod'

import { validates } from '@/configs/validate'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/customer/form.module.scss'
import { LoginBody } from '@/types/customer'

import Button from '@/components/common/button'
import Link from '@/components/common/custom-link'
import CustomForm from '@/components/form'
import TextField from '@/components/form/text-field'

const schema = z.object({
  email: z.string().refine((value) => validates.email.pattern.test(value), validates.email.message),
  password: z.string()
}) satisfies ZodType<LoginBody>

export default function LoginForm() {
  const { fetch: doLogin, isLoading, error, data: loginData } = useCustomerLogin()
  const { push } = useRouterWithQueryParams()
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    setErrorMessage(error?.response?.data.message)
  }, [error])

  const handleSubmitForm = async (data: LoginBody) => {
    await doLogin(data)
    console.log('error', error)
    console.log('loginData', loginData)

    // TODO: handle login successfully
  }

  return (
    <div className={styles.wrapper}>
      <h4 className={classNames(styles.title, 'text-center')}>Login</h4>
      {errorMessage && <p className={classNames(styles.description, 'text-red')}>{errorMessage}</p>}
      <CustomForm schema={schema} onSubmit={handleSubmitForm}>
        <div className={styles.form}>
          <div className={styles.form__field}>
            <TextField showErrorMessage required label="Email" name="email" placeholder="example@email.com" type="email" isLoading={isLoading} isError={!!errorMessage} />
          </div>
          <div className={styles.form__field}>
            <TextField showErrorMessage required label="Password" name="password" placeholder="Password" type="password" isLoading={isLoading} isError={!!errorMessage} />
          </div>
          <Button type="submit" className={styles.form__button} isLoading={isLoading}>
            Login
          </Button>
          <p className={styles.form__redirect}>
            Don't have an account?{' '}
            <Link href={routes.signUpPage()} className="underline">
              Sign up!
            </Link>
          </p>
        </div>
      </CustomForm>
    </div>
  )
}
