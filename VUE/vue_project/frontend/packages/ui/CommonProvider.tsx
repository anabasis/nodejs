'use client'

import { GlobalCssPriority } from '@ui/StyledEngineProvider'
import { ModalComponenet, AlertComponenet, ToastPopup, PageLoading } from '@ui/index'
import dynamic from 'next/dynamic'

const InitAuth = dynamic(() => import('@ui/components/auth/InitAuth'), { ssr: false })

export default function CommonProvider({ children }: { children: React.ReactNode }) {
  return (
    <GlobalCssPriority>
      <InitAuth>{children}</InitAuth>
      <ModalComponenet />
      <AlertComponenet />
      <ToastPopup />
      <PageLoading />
    </GlobalCssPriority>
  )
}
