import { useState } from 'react'

import classNames from 'classnames'

import styles from '@/styles/layout/subscribe.module.scss'

import CustomForm from '../form'
import TextField from '../form/text-field'

export default function Subscribe() {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const toggleCheck = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.wrapper}>
      <CustomForm>
        <>
          <p className="mb-2">Email Sign Up</p>
          <TextField name="subscribe" placeholder="Type Your Email Address Here" inputClassName="border-none" boundaryClassName="rounded-[8px]" />
          <p className={classNames(styles.checkbox, { [styles['checked']]: isChecked })} onClick={toggleCheck}>
            Yes, I want to receive promotional emails from MyDermBox.{' '}
          </p>
          <div className="flex justify-end">
            <button type="submit">Submit</button>
          </div>
        </>
      </CustomForm>
    </div>
  )
}
