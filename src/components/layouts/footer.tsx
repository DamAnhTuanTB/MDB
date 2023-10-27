import { memo, useMemo } from 'react'

import classNames from 'classnames'

import styles from '@/styles/layout/footer.module.scss'
import { FooterContent, FooterMenuItem, MediaIcon } from '@/types/footer'
import { CONTENT_OPTIONS_KEY } from '@/types/global'

import Link from '@/components/common/custom-link'

import HtmlRender from '../common/html-render'

import Social from './social'
import Subscribe from './subscribe'

function getOptionByName<T>(content: FooterContent<T>[], key: keyof typeof CONTENT_OPTIONS_KEY): FooterContent<T> {
  return (content && content.find((item) => item.name === key)) || ({} as FooterContent)
}

type Props = {
  content: FooterContent[]
}

function Footer({ content }: Props) {
  const menuItems = getOptionByName<FooterMenuItem[]>(content, CONTENT_OPTIONS_KEY.FOOTER_MENU_ITEMS)
  const mediaIcons = getOptionByName<MediaIcon[]>(content, CONTENT_OPTIONS_KEY.SOCIAL_MEDIA_ICONS)
  const description = getOptionByName(content, CONTENT_OPTIONS_KEY.FOOTER_DESCRIPTION)

  const menuItemElements = useMemo(
    () =>
      menuItems.jsonValue &&
      menuItems.jsonValue.length > 0 &&
      menuItems.jsonValue.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <HtmlRender htmlString={item.description} />
        </div>
      )),
    []
  )

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.content__menu}>{menuItemElements}</div>
            <Social icons={mediaIcons.jsonValue || []} className="lg:hidden" />
            <p className={styles.link}>
              Are you an aesthetic professional?{' '}
              <Link className="font-bold" href={'/'}>
                CLICK HERE
              </Link>
            </p>
          </div>
          <div className={classNames(styles.content, styles.content2)}>
            <Subscribe />
            <div className={styles.contact}>
              <h3>Contact Us</h3>
              <HtmlRender htmlString={description.value || ''} />
              <Social icons={mediaIcons.jsonValue || []} className="hidden lg:block" />
            </div>
          </div>
        </div>
        <div className={styles.copyright}>MyDermBox 2023 © All rights reserved</div>
      </footer>
    </>
  )
}

export default memo(Footer)
