import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { ZodType, z } from 'zod'

import { validates } from '@/configs/validate'
import { useCustomerLogin } from '@/hooks/pages/use-customer-login'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import { useAuthStore } from '@/recoil/auth'

import routes from '@/routes'
import styles from '@/styles/modules/customer/form.module.scss'
import { LoginBody } from '@/types/authentication'

import Button from '@/components/common/button'
import Link from '@/components/common/custom-link'
import CustomForm from '@/components/form'
import TextField from '@/components/form/text-field'

const schema = z.object({
  email: z.string().refine((value) => validates.email.pattern.test(value), validates.email.message),
  password: z.string()
}) satisfies ZodType<LoginBody>

export default function LoginForm() {
  const { isLoggedIn, isLoading: isLoadingStage } = useAuthStore()
  const { login, isLoading, errorMessage, data: loginData } = useCustomerLogin()
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false)
  const { query, push } = useRouterWithQueryParams()

  useEffect(() => {
    if (isLoading) setIsLoadingPage(true)
  }, [isLoading])

  useEffect(() => {
    if (isLoggedIn && !isLoadingStage) {
      if (query?.onBack === '/account/information') push(routes.accountInformationPage())
      else push(routes.homePage())
    }
  }, [isLoggedIn, isLoadingStage])

  return (
    <div className={styles.wrapper}>
      <h4 className={classNames(styles.title, 'text-center')}>Login</h4>
      {errorMessage && <p className={classNames(styles.description, 'text-red')}>{errorMessage}</p>}
      <CustomForm schema={schema} onSubmit={login}>
        <div className={styles.form}>
          <div className={styles.form__field}>
            <TextField showErrorMessage required label="Email" name="email" placeholder="example@email.com" type="email" isLoading={isLoading} isError={!!errorMessage} />
          </div>
          <div className={styles.form__field}>
            <TextField showErrorMessage required label="Password" name="password" placeholder="Password" type="password" isLoading={isLoading} isError={!!errorMessage} />
          </div>
          <Button type="submit" className={styles.form__button} isLoading={isLoadingPage}>
            Login
          </Button>
          <div className={classNames(styles.form__redirect, 'flex flex-col items-start md:items-center md:flex-row md:justify-between')}>
            <p>
              Don't have an account?{' '}
              <Link href={routes.signUpPage()} className="underline">
                Sign up!
              </Link>
            </p>

            <Link href={routes.forgotPasswordPage()} className="underline">
              Forgot password
            </Link>
          </div>
        </div>
      </CustomForm>
    </div>
  )
}
