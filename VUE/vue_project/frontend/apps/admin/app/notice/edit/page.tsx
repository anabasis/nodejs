'use client'
import { useEffect, useState } from 'react'
import { Breadcrumb, ContentBox } from 'ui'
import { useSearchParams } from 'next/navigation'
import { isEmptyPropertyCheck, useParamsData } from 'library'
import NoticeContent from '@components/notice/NoticeContent'
import { NoticeAddParamsType, NoticeDetailReturnType } from '@type/notice'
import { useNoticeEditor } from '@hook/useNoticeEditor'
import { useAtom, useSetAtom } from 'jotai'
import { noticeDataAtom } from '@store/client/notice'
import { getNoticeListDetail } from '@api/notice'

const pageTitleList = ['Notcie', 'Notice Detail', 'Edit Notice']

const initData = {
  noticeTypeCode: '',
  noticeCategoryCode: '',
  exposureTypeCode: 'NP01',
  openLevelCode: 'PUB',
  noticeMultiLanguage: [],
  noticeAttachment: [],
  partiallyOpenRequests: [],
  exposurePeriodTypeCode: '',
  exposureFrequencyCode: '',
}

const NoticeEditPage = () => {
  const searchParams = useSearchParams()
  const noticeId = searchParams.get('noticeId')
  const [noticeData, setNoticeData] = useAtom(noticeDataAtom)
  const [noticeTitle, setNoticeTitle] = useState('')
  const { resetParams, eidtInitParams, isParamsLoading } = useParamsData<NoticeAddParamsType>()
  const { setCommonData, setCheckedPrtnUser, setEditorInitLists, setEditorList, commonData, initCodes } = useNoticeEditor()

  const getDetailData = async () => {
    try {
      const res: NoticeDetailReturnType = await getNoticeListDetail({ noticeId })
      if (res) {
        eidtInitParams(initData, {
          ...res,
          partiallyOpenRequests: res.noticePartiallyOpen,
        })

        setNoticeTitle(res?.title)
        setEditorInitLists()
        setCheckedPrtnUser(res.noticePartiallyOpen)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const init = () => {
    initCodes()
    if (isEmptyPropertyCheck(noticeData)) {
      eidtInitParams(initData, {
        ...noticeData,
        partiallyOpenRequests: noticeData.noticePartiallyOpen,
      })

      setCheckedPrtnUser(noticeData.noticePartiallyOpen)
      setNoticeTitle(noticeData?.title)
      setEditorInitLists()
      return
    }

    getDetailData()
  }

  useEffect(() => {
    init()
    return () => {
      resetParams()
      setEditorList([])
      setNoticeData(null)
      setCommonData(null)
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
            <h1 className="headline1">{noticeTitle}</h1>
          </div>
        </ContentBox>
      </div>

      {!isParamsLoading && isEmptyPropertyCheck(commonData) && <NoticeContent />}
    </>
  )
}

export default NoticeEditPage
