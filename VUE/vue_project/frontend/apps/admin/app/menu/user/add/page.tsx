'use client'

import MenuManagementPage from '@components/menu/menuManagement'

const isEdit = false

export default function AddUserMenuPage() {
  return <MenuManagementPage menuType={'user'} isEdit={isEdit} />
}
