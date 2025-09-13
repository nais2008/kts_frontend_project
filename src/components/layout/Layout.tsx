import type { PropsWithChildren } from 'react'

import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
