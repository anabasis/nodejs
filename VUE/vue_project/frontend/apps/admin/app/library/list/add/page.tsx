'use client'

import LibraryContent from '@components/library/list/LibraryContent'
import { Breadcrumb, ContentBox } from 'ui'
import { useParamsData } from 'library'
import { LibraryManualListAddParamsType } from '@type/library'
import { useEffect } from 'react'

import { useLibraryEditor } from '@hook/useLibraryEditor'
const pageTitleList = ['Library', 'Manual List', 'Add Manual']
const initData = {
  titl: '',
  cont: '',
  openLevelCode: 'PUB',
  dowlUseYn: 'N',
}

function LibraryAddPage() {
  const { params, resetParams, isParamsLoading } = useParamsData<LibraryManualListAddParamsType>(initData)
  const { setCheckedPrtnUser } = useLibraryEditor({ params })

  useEffect(() => {
    return () => {
      resetParams()
      setCheckedPrtnUser([])
    }
  }, [])
  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        {/* 페이지 상단 박스 케이스 */}
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Add manual</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>{!isParamsLoading && <LibraryContent />}</ContentBox>
    </>
  )
}

export default LibraryAddPage
