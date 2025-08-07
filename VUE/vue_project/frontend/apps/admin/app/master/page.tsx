/**
 * 작성자 : 양수연
 * 화면 : AD.2 마스터 데이터
 * path : /master
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MasterData() {
  const router = useRouter()

  useEffect(() => router.replace('/master/product'), [])

  return null
}
