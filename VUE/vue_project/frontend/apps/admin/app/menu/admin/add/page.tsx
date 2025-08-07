'use client'
import { usePathname } from 'next/navigation'
import MenuManagementPage from '@components/menu/menuManagement'

const isEdit = false

export default function AddUserMenuPage() {
  return <MenuManagementPage menuType={'admin'} isEdit={isEdit} />
}
