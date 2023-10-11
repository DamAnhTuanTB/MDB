import Link from 'next/link'

import classNames from 'classnames'

import routes from '@/routes'
import styles from '@/styles/layout/footer.module.scss'

import Social from './social'
import Subscribe from './subscribe'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.content__menu}>
              <div>
                <h3>Customer Service</h3>
                <ul>
                  <li>
                    <Link href={routes.faqPage()}>FAQs</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Track My Order</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Shipping & Returns</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3>MyDermBox</h3>
                <ul>
                  <li>
                    <Link href={'/'}>About Us</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href={'/'}>News</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Sitemap</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3>Legal</h3>
                <ul>
                  <li>
                    <Link href={'/'}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Product Recall</Link>
                  </li>
                  <li>
                    <Link href={'/'}>Accessibility</Link>
                  </li>
                </ul>
              </div>
            </div>
            <Social className="lg:hidden" />
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
              <ul>
                <li>Email: support@mydermbox.com</li>
                <li>1-800-918-2427</li>
              </ul>
              <Social className="hidden lg:block" />
            </div>
          </div>
        </div>
        <div className={styles.copyright}>MyDermBox 2023 © All rights reserved</div>
      </footer>
    </>
  )
}
