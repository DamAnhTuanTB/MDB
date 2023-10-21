import styles from '@/styles/modules/product/description.module.scss'

import HtmlRender from '@/components/common/html-render'

type Props = {
  text?: string
}

export default function HowToUse({ text = '' }: Props) {
  return (
    <div className={styles.content_wrapper}>
      <HtmlRender htmlString={text} />
    </div>
  )
}
