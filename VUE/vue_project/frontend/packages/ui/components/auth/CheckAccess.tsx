'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { startsWith as _startsWith } from 'lodash-es'
import { useMenu, isDev, scrollTopMain } from 'library'
import { getDetailGuides } from 'library/api/common'
import { GuideItem } from 'library/type/common'
import GuideArea from '@ui/layouts/GuideArea'

export default function CheckAccess() {
  const router = useRouter()
  const pathname = usePathname()
  const [guides, setGuides] = useState<GuideItem[]>([])
  const { getLnb, getGnb } = useMenu()

  const sliceSlash = (str: string) => (str.length > 1 ? str.replace(/\/$/, '') : str)
  const countSlashes = (path: string) => path.match(/\//g)?.length ?? 0
  const getPath = () => location.pathname

  useEffect(() => {
    const checkAccess = () => {
      const path = sliceSlash(pathname)
      const etcs = ['/mypage', '/analyte', '/create', '/editor', '/popup', '/result', '/publ']
      const menu = getLnb?.filter((v) =>
        !!v.mnuUrl && countSlashes(path) > countSlashes(v.mnuUrl) && v.mnuUrl !== '/' ? _startsWith(path, v.mnuUrl) : path === v.mnuUrl
      )
      const menuG = getGnb?.filter((v) => path.includes(v.mnuUrl))
      const menuE = etcs.filter((v) => path.includes(v))

      const passAccess = async () => {
        window.pageLoading({ show: false })
        // setGuides(await getDetailGuides(`${path}${searchParams.size ? '/?' + searchParams.toString() : ''}`))
        setGuides(await getDetailGuides(sliceSlash(getPath())))
      }

      if (isDev || (menuE && menuE.length > 0) || (menuG && menuG.length > 0)) {
        passAccess()
      } else if (menu && menu.length > 0) {
        if (menu[0]?.redYn !== 'N' || menu[0]?.mnuUrl === '/') {
          passAccess()
        } else {
          alert(`${path} 경로의 읽기 권한이 없습니다.`)
          router.back()
        }
      }
    }
    checkAccess()
  }, [pathname, router, getLnb, getGnb])

  useEffect(() => {
    /* Scroll top default */
    if (pathname) {
      scrollTopMain()
    }
  }, [pathname])

  return guides?.length > 0 ? <GuideArea guides={guides[0]} /> : null
}
