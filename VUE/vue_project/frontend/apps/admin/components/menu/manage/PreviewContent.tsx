import React, { useEffect, useState } from 'react'
import { Header } from './preview/Header'
import Navigation from './preview/Navigation'
import { getGnbMenuList, getLnbMenuList, MenuItemType } from 'library/util'

export const PreviewContent = ({ isAdmin, changeableGnb, changeableLnb }) => {
  const [current, setCurrent] = useState<number>(0)

  return (
    <div className="min_h840">
      <Navigation lnbList={changeableLnb} isAdmin={isAdmin} current={current} setCurrent={setCurrent} />
      <Header gnbList={changeableGnb} current={current} setCurrent={setCurrent} />
    </div>
  )
}
