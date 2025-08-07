'use client'

import { ContentBox, ContentBoxWrap, BaseTab, Breadcrumb } from 'ui'
import { useCallback, useEffect, useState } from 'react'
import ManageContentWrapper from '@components/menu/manage/ManageContentWrapper'
import { MenuItemType, getGnbMenuList, getLnbMenuList } from 'library/util/menu'

const TabData = [{ tabName: 'GNB' }, { tabName: 'LNB' }]
const pageTitleList = ['Admin Menu', 'Manage Admin Menu']
const isAdmin = true

export default function AdminMenuManagePage() {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0)
  const [gnbList, setGnbList] = useState<MenuItemType[]>([])
  const [lnbList, setLnbList] = useState<MenuItemType[]>([])

  const handleTabChange = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setCurrentTabIndex(newIndex)
  }, [])

  const initMenuData = async () => {
    getGnbMenuList(isAdmin).then((gnbList) => {
      setGnbList(gnbList)
    })
    getLnbMenuList(isAdmin).then((lnbList) => {
      setLnbList(lnbList)
    })
  }

  useEffect(() => {
    initMenuData()
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Manage Admin Menu</h1>
          </div>
        </ContentBox>
        <BaseTab tabData={TabData} onChange={handleTabChange} value={currentTabIndex} />
      </div>
      <ManageContentWrapper isAdmin={isAdmin} gnbList={gnbList} lnbList={lnbList} currentTab={currentTabIndex == 0 ? 'gnb' : 'lnb'} />
    </>
  )
}
