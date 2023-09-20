import Image from 'next/image'

import classNames from 'classnames'

import styles from '@/styles/layout/header.module.scss'

import CustomForm from '../form'
import TextField from '../form/text-field'

type Props = {
  className?: string
}

export default function Search({ className }: Props) {
  return (
    <div className={classNames(styles.search, className)}>
      <CustomForm>
        <div className={styles.search__input}>
          <div className={styles.search__input__icon}>
            <Image src={'/images/icons/search.svg'} width={16} height={16} alt="My Dermbox" />
          </div>
          <TextField width={'100%'} name="keyword" placeholder="Search for a product, brand, or keyword" inputClassName="h-[32px] lg:h-10 border-none pl-0" boundaryClassName="rounded-[8px]" />
        </div>
      </CustomForm>
    </div>
  )
}
