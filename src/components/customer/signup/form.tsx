import { useEffect, useState } from 'react'

import classNames from 'classnames'
import { ZodType, z } from 'zod'

import { validates } from '@/configs/validate'
import { useCustomerSignUp } from '@/hooks/pages/use-customer-signup'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/customer/form.module.scss'
import { SignUpBody } from '@/types/customer'

import Button from '@/components/common/button'
import Checkbox from '@/components/common/checkbox'
import Link from '@/components/common/custom-link'
import CustomForm from '@/components/form'
import TextField from '@/components/form/text-field'

const schema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().refine((value) => validates.email.pattern.test(value), validates.email.message),
    password: z.string().min(8),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validates.confirmPassword.message,
    path: ['confirmPassword']
  }) satisfies ZodType<SignUpBody>

export default function SignUpForm() {
  const { fetch: doSignUp, isLoading, errorMessage, data: signUpData } = useCustomerSignUp()
  const { push } = useRouterWithQueryParams()
  const [isAllowTerms, setIsAllowTerms] = useState<boolean>(false)
  const [isAllowEmail, setIsAllowEmail] = useState<boolean>(false)

  useEffect(() => {
    if (signUpData) push(routes.loginPage())
  }, [signUpData])

  const handleSubmitForm = (data: SignUpBody) => {
    const postData: SignUpBody = {
      ...data,
      allowPromotions: isAllowEmail
    }
    doSignUp(postData)
  }

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Create Account</h4>
      <p className={styles.description}>Register now to check out faster, view orders, and get exclusive deals!</p>
      {errorMessage && <p className={classNames(styles.description, 'text-red')}>{errorMessage}</p>}
      <CustomForm schema={schema} onSubmit={handleSubmitForm}>
        <div className={styles.form}>
          <div className={styles.form__group}>
            <div className={styles.form__field}>
              <TextField showErrorMessage required label="First Name" name="firstName" placeholder="First name" isLoading={isLoading} />
            </div>
            <div className={styles.form__field}>
              <TextField showErrorMessage required label="Last Name" name="lastName" placeholder="Last name" isLoading={isLoading} />
            </div>
          </div>
          <div className={styles.form__field}>
            <TextField showErrorMessage required label="Email Address" name="email" placeholder="Email address" type="email" isLoading={isLoading} />
          </div>
          <div className={styles.form__field}>
            <TextField showErrorMessage required label="Password" name="password" placeholder="Password" type="password" isLoading={isLoading} />
          </div>
          <TextField showErrorMessage required label="Confirm Password" name="confirmPassword" placeholder="Confirm password" type="password" isLoading={isLoading} />
          <div className={styles.form__checkbox}>
            <Checkbox label="I agree to the Terms of Use and Privacy Policy" onChange={(checked) => setIsAllowTerms(checked)} labelClassName={'!text-sm'} />
            <Checkbox label="Sign up to receive our emails for exclusive promos and deals" onChange={(checked) => setIsAllowEmail(checked)} className="!mt-[14px]" labelClassName={'!text-sm'} />
          </div>
          <Button type="submit" className={styles.form__button} disabled={!isAllowTerms} isLoading={isLoading}>
            Create Account
          </Button>
          <p className={styles.form__redirect}>
            Returning Customer?{' '}
            <Link href={routes.loginPage()} className="underline">
              Log in!
            </Link>
          </p>
        </div>
      </CustomForm>
    </div>
  )
}
