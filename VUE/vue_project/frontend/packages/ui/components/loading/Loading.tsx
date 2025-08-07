// 작업자 : 김수연
'use client'

import { Icons } from '@ui/components/Icons'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    pageLoading: Function
  }
}

// 에디팅이 가능한 페이지 하단 컨텐츠 버튼 그룹

const DimContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const PageLoading = () => {
  const [isShow, setIsShow] = useState(false)
  const [isMask, setIsMask] = useState(true)

  useEffect(() => {
    window.pageLoading = ({ show = true, mask = true }) => {
      setIsShow(show)
      setIsMask(mask)
    }
  }, [])

  return (
    <DimContainer style={{ display: isShow ? '' : 'none', backgroundColor: isMask ? 'rgba(255, 255, 255, 0.75)' : 'rgba(255, 255, 255, 1)' }}>
      <Icons.Loading />
    </DimContainer>
  )
}
