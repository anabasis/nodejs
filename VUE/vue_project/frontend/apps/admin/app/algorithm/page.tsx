'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Algo() {
  const router = useRouter()

  useEffect(() => router.replace('/algorithm/library-manage'), [])

  return null
}
