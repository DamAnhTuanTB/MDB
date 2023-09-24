import classNames from 'classnames'
import ReactSlider from 'react-slider'

import styles from '@/styles/modules/product/sidebar.module.scss'

type Props = {
  title: string
  withTitle?: boolean
}

export default function Slider({ title, withTitle = true }: Props) {
  return (
    <div className={classNames(styles.group, { '!mt-0': !withTitle })}>
      {withTitle && <div className={styles.group__title}>{title}</div>}
      <div className={classNames(styles.group__value, [styles['range']])}>
        <ReactSlider
          className="slider"
          thumbClassName="slider__thumb"
          trackClassName="slider__track"
          defaultValue={[0, 100]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          pearling
          minDistance={10}
          renderThumb={(props, state) => (
            <div {...props}>
              <div className="slider__thumb__value">{`$${state.valueNow}`}</div>
            </div>
          )}
          onAfterChange={(value) => console.log(value)}
        />
      </div>
    </div>
  )
}
