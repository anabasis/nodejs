'use client'
import { Breadcrumb, ContentBox } from 'ui'
import QnaEditorContent from '@components/helpdesk/qna/QnaEditorContent'
import { useSearchParams } from 'next/navigation'
import { isEmptyPropertyCheck } from 'library'
import { useParamsData } from 'library/hook'
import { useAtom, useSetAtom } from 'jotai'
import { QnaAddInitParamsType, QnaDetailType } from '@type/qna'
import { qnaDetailDataAtom, checkedAtom } from '@store/client/qna'
import { getQnaListDetail } from '@api/qna'
import { useEffect } from 'react'

const initData = {
  type: '',
  category: '',
  module: '',
  title: '',
  content: '',
  openLevel: 'PRV',
}

const pageTitleList = ['Help Desk', 'QnA Detail', 'Edit QnA']

const QnaEditPage = () => {
  const searchParams = useSearchParams()
  const qnaNum = searchParams.get('qnaNum')
  const { eidtInitParams, resetParams, isParamsLoading } = useParamsData<QnaAddInitParamsType>(initData)
  const [qnaDetailData, setQnaDetailData] = useAtom(qnaDetailDataAtom)
  const setCheckedPrtnUser = useSetAtom(checkedAtom)

  const initParams = (res: QnaDetailType) => {
    eidtInitParams({
      category: res.qnaCategory,
      content: res.content,
      module: res.qnaModule,
      status: res.qnaStatus,
      openLevel: res.openLevelCode,
      prtnUser: res.prtnUser,
      title: res.title,
      type: res.qnaType,
      qnaAttachResponse: res.qnaAttachResponse,
    })
  }

  const getQnaDetailData = async () => {
    try {
      const res: QnaDetailType = await getQnaListDetail({ qnaNum })
      if (res) {
        initParams(res)
        res?.prtnUser && setCheckedPrtnUser(res?.prtnUser)
        setQnaDetailData(res)
      }
    } catch (err) {
      console.error(31, err)
    }
  }

  const init = () => {
    const detailData = qnaDetailData as QnaDetailType
    if (isEmptyPropertyCheck(qnaDetailData)) {
      initParams(detailData)
      setCheckedPrtnUser(detailData?.prtnUser)
      setQnaDetailData(detailData)
      return
    }
    getQnaDetailData()
  }

  useEffect(() => {
    init()
    return () => {
      setQnaDetailData(null)
      resetParams()
      setCheckedPrtnUser([])
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{qnaDetailData?.title}</h1>
            {/* <Dl listData={descListData} /> */}
          </div>
        </ContentBox>
      </div>

      {!isParamsLoading && <QnaEditorContent />}
    </>
  )
}

export default QnaEditPage
