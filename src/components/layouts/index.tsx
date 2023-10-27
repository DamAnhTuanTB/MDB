import React from 'react'

import { FooterContent } from '@/types/footer'

import Footer from './footer'
import Header from './header'

type Props = {
  children: React.ReactNode
  footerContent: FooterContent[]
}
export default function Layout({ children, footerContent }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer content={footerContent} />
    </>
  )
}
