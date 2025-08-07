'use client'

import LibraryContent from '@components/library/list/LibraryContent'
import { Breadcrumb, ContentBox } from 'ui'
import { isEmptyPropertyCheck, useParamsData } from 'library'
import { LibraryManualListAddParamsType, LibraryManualListDetailType } from '@type/library'
import { useEffect } from 'react'
import { getLibraryManualsListDetail } from '@api/library'
import { libListDataAtom } from '@store/client/library'
import { useLibraryEditor } from '@hook/useLibraryEditor'
import { useAtom } from 'jotai'
const pageTitleList = ['Library', 'Manual Detail', 'Edit Manual']

const initData = {
  titl: '',
  cont: '',
  openLevelCode: 'PUB',
  dowlUseYn: 'N',
  ptlCorpCode: [],
  librNum: 1,
  librCatNum: 1,
  fileInfoResponses: [],
  partiallyOpenRequests: [],
}

function LibraryEditPage() {
  const { params, resetParams, eidtInitParams, isParamsLoading } = useParamsData<LibraryManualListAddParamsType>(initData)
  const { setCheckedPrtnUser, librNum } = useLibraryEditor({ params })
  const [libData, setLibData] = useAtom(libListDataAtom)

  const init = () => {
    if (isEmptyPropertyCheck(libData)) {
      eidtInitParams(initData, {
        ...libData,
        openLevelCode: libData.openLvlCd,
        partiallyOpenRequests: libData.ptlCorpCode,
      })

      setCheckedPrtnUser(libData?.ptlCorpCode?.map((el) => ({ corporationNum: el })))
      return
    }

    getDetailData()
  }

  const getDetailData = async () => {
    try {
      const res: LibraryManualListDetailType = await getLibraryManualsListDetail({ id: librNum })
      if (res) {
        setLibData({
          ...res,
          openLevelCode: res.openLvlCd,
        })
        eidtInitParams(initData, {
          ...res,
          openLevelCode: res.openLvlCd,
          partiallyOpenRequests: res.ptlCorpCode,
        })
        setCheckedPrtnUser(res?.ptlCorpCode?.map((el) => ({ corporationNum: el })))
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init()
    return () => {
      resetParams()
      setCheckedPrtnUser([])
      setLibData(null)
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
            <h1 className="headline1">{libData?.titl}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>{!isParamsLoading && <LibraryContent />}</ContentBox>
    </>
  )
}

export default LibraryEditPage
