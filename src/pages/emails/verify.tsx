import { useEffect, useState } from 'react'

import classNames from 'classnames'

import { useEmailVerify } from '@/hooks/pages/use-email-verify'
import { useRouterWithQueryParams } from '@/hooks/use-router-with-query-params'
import routes from '@/routes'
import styles from '@/styles/modules/email-verify.module.scss'

import Button from '@/components/common/button'
import Link from '@/components/common/custom-link'

export default function EmailVerifyPage() {
  const { query, push } = useRouterWithQueryParams()
  const { fetch: verifyEmail, errorMessage, successMessage } = useEmailVerify()
  const [firtCheck, setFirtCheck] = useState<boolean>(true)

  useEffect(() => {
    const { code, email } = query
    if (!code || !email) {
      push(routes.homePage())
      return
    }

    if (firtCheck) {
      verifyEmail({ code: code as string, email: email as string })
      setFirtCheck(false)
    }
  }, [])

  return (
    <div className={classNames('container', styles.wrapper)}>
      {successMessage && <p className={classNames(styles.message, styles.success)}>{successMessage}</p>}
      {errorMessage && <p className={classNames(styles.message, styles.error)}>{errorMessage}</p>}
      <div className={styles.button}>
        <Link href={routes.homePage()}>
          <Button>Back to home page</Button>
        </Link>
      </div>
    </div>
  )
}
