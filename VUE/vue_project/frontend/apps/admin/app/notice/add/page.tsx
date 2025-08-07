'use client'
import { useEffect } from 'react'
import { Breadcrumb, ContentBox } from 'ui'
import { useParamsData } from 'library'
import NoticeContent from '@components/notice/NoticeContent'
import { NoticeAddParamsType } from '@type/notice'
import { useNoticeEditor } from '@hook/useNoticeEditor'

const pageTitleList = ['Notice', 'Add Notice']

const initData = {
  noticeTypeCode: '',
  exposureFrequencyCode: '',
  exposurePeriodTypeCode: '',
  noticeCategoryCode: '',
  exposureTypeCode: 'NP01',
  openLevelCode: 'PUB',
  noticeMultiLanguage: [{ title: '', languageCode: 'en', content: '' }],
}

const NoticeAddPage = () => {
  const { resetParams, isParamsLoading } = useParamsData<NoticeAddParamsType>(initData)
  const { setEditorList, initCodes, setCheckedPrtnUser } = useNoticeEditor()

  useEffect(() => {
    initCodes()
    return () => {
      resetParams()
      setEditorList([])
      setCheckedPrtnUser([])
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Add Notice</h1>
          </div>
        </ContentBox>
      </div>

      {!isParamsLoading && <NoticeContent />}
    </>
  )
}

export default NoticeAddPage
