'use client'

import { useEffect, useState, useCallback } from 'react'
import { BaseTab } from 'ui'
import MenuListHeader from '@components/menu/MenuListHeader'
import WrapMenuList from '@components/menu/WrapMenuList'
import { getUserRoleApi } from '@api/menumanagement'
import { filter } from 'lodash-es'
import { IUserRole, IUserRoleDropDownList } from '@type/menu/menuTypes'
import { useMenuListQuery } from '@store/server/useMenuQuery'
import { currentTabIndexAtom } from '@store/client/menu'
import { useAtom } from 'jotai'

const isAdmin = false
const pageTitleList = ['User Menu']

export default function UserMenuPage() {
  const { data: menuList, refetch } = useMenuListQuery({ isAdmin })

  const [roleList, setRoleList] = useState<IUserRoleDropDownList>()
  const [currentTabIndex, setCurrentTabIndex] = useAtom(currentTabIndexAtom)

  const initData = async () => {
    refetch()

    const roleResponseData: IUserRole[] = await getUserRoleApi()
    if (!!roleResponseData) {
      setRoleList({ levelA: filter(roleResponseData, { roleLv: 'A' }), levelB: filter(roleResponseData, { roleLv: 'B' }) })
    }
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
  }, [isAdmin])

  return (
    <>
      <div className="sticky_wrap">
        <MenuListHeader isAdmin={isAdmin} pageTitleList={pageTitleList} />
        <BaseTab tabData={TabData} onChange={handleTabChange} value={currentTabIndex} />
      </div>
      <WrapMenuList refetch={refetch} isAdmin={isAdmin} dataList={menuList} dropdownOptions={roleList} currentTabIndex={currentTabIndex} />
    </>
  )
}
