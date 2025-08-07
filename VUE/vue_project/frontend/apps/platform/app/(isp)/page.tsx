'use client'

import CLevel from '@components/dashboard/cLevel'
import Developer from '@components/dashboard/Developer'
import { useUser } from 'library/hook'

import 'ui/styles/global/_dashboard.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function DashBoardMain() {
  const { userData } = useUser()

  return <>{userData?.userRole.usrRolCd === 'U-XM' ? <CLevel /> : <Developer />}</>
  // return <CLevel />
  // return <Developer />
}
