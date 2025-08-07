'use client'

import { useEffect, useState, useCallback } from 'react'
import { BaseTab } from 'ui'
import MenuListHeader from '@components/menu/MenuListHeader'
import WrapMenuList from '@components/menu/WrapMenuList'
import { getAdminRoleApi } from '@api/menumanagement'
import { IAdminRole } from '@type/menu/menuTypes'
import { currentTabIndexAtom } from '@store/client/menu'
import { useMenuListQuery } from '@store/server/useMenuQuery'
import { useAtom } from 'jotai'

const isAdmin = true
const pageTitleList = ['Admin Menu']

export default function AdminMenuPage() {
  const { data: menuList, refetch } = useMenuListQuery({ isAdmin })
  const [roleList, setRoleList] = useState<IAdminRole[]>([])
  const [currentTabIndex, setCurrentTabIndex] = useAtom(currentTabIndexAtom)

  const initData = async () => {
    refetch()

    const roleResponseData = await getAdminRoleApi()
    setRoleList(roleResponseData)
  }
  const TabData = [{ tabName: 'GNB' }, { tabName: 'LNB' }]

  const handleTabChange = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      setCurrentTabIndex(newIndex)
    },
    [setCurrentTabIndex]
  )

  useEffect(() => {
    initData()
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <MenuListHeader isAdmin={isAdmin} pageTitleList={pageTitleList} />
        <BaseTab tabData={TabData} onChange={handleTabChange} value={currentTabIndex} />
      </div>
      {menuList && <WrapMenuList refetch={refetch} isAdmin={isAdmin} dataList={menuList} dropdownOptions={roleList} currentTabIndex={currentTabIndex} />}
    </>
  )
}
