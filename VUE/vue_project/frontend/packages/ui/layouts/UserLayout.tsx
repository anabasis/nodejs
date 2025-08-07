'use client'

import style from '@ui/styles/common/_layouts.module.scss'
import Header from '@ui/layouts/Header'
import Navigation from '@ui/layouts/Navigation'

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={`align top wrapper ${style.wrapper}`}>
      <Navigation />
      <main id="main_container" className={`${style.main} scroll_container`}>
        <Header />
        <div className={`align colunm gap_0 top ${style.default}`}>{children}</div>
      </main>
    </section>
  )
}

export default UserLayout
