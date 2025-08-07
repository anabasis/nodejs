import React, { useEffect, useState } from 'react'
import { Header } from './preview/Header'
import Navigation from './preview/Navigation'
import { getGnbMenuList, getLnbMenuList, MenuItemType, getIsAdmin } from 'library/util'

export const PreviewContent = ({ isAdd, isAdmin, basicInformation, menuLocation, menuDetail }) => {
  const [isGnb, setIsGnb] = useState(false)
  const [gnbList, setGnbList] = useState<MenuItemType[]>([])
  const [lnbList, setLnbList] = useState<MenuItemType[]>([])
  const [current, setCurrent] = useState<number>(-1)

  useEffect(() => {
    setIsGnb(basicInformation.navigationLocation === 'GNB')
  }, [basicInformation])

  const initPreviewMenuData = async () => {
    getGnbMenuList(isAdmin).then((menuGnb) => {
      setGnbList(menuGnb)
    })
    getLnbMenuList(isAdmin).then((menuLnb) => {
      setLnbList(menuLnb)
    })
  }

  useEffect(() => {
    initPreviewMenuData()
  }, [])

  return (
    <div className="min_h840">
      {isGnb ? (
        <>
          <Navigation lnbList={lnbList} isAdmin={isAdmin} isAdd={isAdd} current={current} setCurrent={setCurrent} />
          <Header
            isAdd={isAdd}
            gnbList={gnbList}
            isAdmin={isAdmin}
            basicInformation={basicInformation}
            menuLocation={menuLocation}
            menuDetail={menuDetail}
            current={current}
            setCurrent={setCurrent}
          />
        </>
      ) : (
        <>
          <Navigation
            isAdd={isAdd}
            lnbList={lnbList}
            isAdmin={isAdmin}
            basicInformation={basicInformation}
            menuLocation={menuLocation}
            menuDetail={menuDetail}
            current={current}
            setCurrent={setCurrent}
          />
          <Header isAdd={isAdd} gnbList={gnbList} isAdmin={isAdmin} current={current} setCurrent={setCurrent} />
        </>
      )}
    </div>
  )
}
