'use client'
import { useSearchParams } from 'next/navigation'
import MenuManagementPage from '@components/menu/menuManagement'
import { useEffect, useState } from 'react'
import { useMenuDetailQuery } from '@store/server/useMenuQuery'
import { MenuDetailViewType } from '@type/menu/menumanagement'

const isEdit = true

export default function AdminMenuEditPage() {
  const params = useSearchParams()
  const menuId = params.get('id')
  const { data: menuDetailRes } = useMenuDetailQuery(+menuId)
  const [menuDetail, setMenuDetail] = useState<MenuDetailViewType>()

  const initData = () => {
    const newMenuDetail = { ...menuDetailRes?.['basicInfoRes'], menuNum: +menuId }
    setMenuDetail({ ...menuDetailRes, basicInfoRes: newMenuDetail })
  }

  useEffect(() => {
    if (menuDetailRes) {
      initData()
    }
  }, [menuDetailRes])

  return <>{menuDetail ? <MenuManagementPage menuType={'admin'} menuId={menuId} isEdit={isEdit} menuDetail={menuDetail} /> : null}</>
}
