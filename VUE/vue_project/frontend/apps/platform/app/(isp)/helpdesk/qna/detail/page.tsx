'use client'
import { Breadcrumb, ButtonMui, ContentBox, Dl } from 'ui'
import { useSearchParams, useRouter } from 'next/navigation'
import QnaDetailAnswerContent from '@components/helpdesk/qna/QnaDetailAnswerContent'
import QnaDetailAuthorContent from '@components/helpdesk/qna/QnaDetailAuthorContent'
import QnaDetailAnserCommentContent from '@components/helpdesk/qna/QnaDetailAnserCommentContent'
import { setDescListData, AlertType, useAlert, changeTimeLocal } from 'library'
import { QnaDetailType, QnaDetailAnswerType } from '@type/qna'
import { getQnaListDetail, getQnaDetailAnswer } from '@api/qna'
import { useEffect, useMemo, useState } from 'react'
import { useSetAtom } from 'jotai'
import { qnaNumAtom, qnaDetailDataAtom, qnaCommentCountAtom } from '@store/client/qna'
import { useQnaMuate } from '@store/server/useQnaQuery'

const pageTitleList = ['Help Desk', 'QnA Detail']

const QnaDetailPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const qnaNum = searchParams.get('qnaNum')
  const setQnaNum = useSetAtom(qnaNumAtom)
  const setQnaDetailData = useSetAtom(qnaDetailDataAtom)
  const seQnaCommentCountAtom = useSetAtom(qnaCommentCountAtom)
  const [detailData, setDetailData] = useState<QnaDetailType>(null)
  const { alertOpen, alertClose } = useAlert()
  const { qnaDeleteMutate } = useQnaMuate()
  const [answerData, setAnswerData] = useState<QnaDetailAnswerType>(null)

  const getQnaDetailData = async () => {
    try {
      const res: QnaDetailType = await getQnaListDetail({ qnaNum })
      if (res) {
        setDetailData(res)
        setQnaDetailData(res)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const getQnaAnswerData = async () => {
    try {
      const res = await getQnaDetailAnswer({ qnaNum })
      if (res.length > 0) {
        setAnswerData({
          ...res[0],
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  const init = () => {
    getQnaDetailData()
    getQnaAnswerData()
  }

  const setDescList = useMemo(() => {
    if (!detailData) return []
    const { createDate, modifyDate, writer, openLevel } = detailData
    const descTitleArr = ['Date', 'Update', 'Created by', 'Open Level']
    const listInfoValueArr = [
      changeTimeLocal({ time: createDate, type: 'yyyy-MM-dd' }),
      changeTimeLocal({ time: modifyDate, type: 'yyyy-MM-dd' }),
      writer,
      openLevel,
    ]

    return setDescListData(descTitleArr, listInfoValueArr)
  }, [detailData])

  const deleteProcess = () => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => qnaDeleteMutate({ qnaNum })}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }
  useEffect(() => {
    setQnaNum(+qnaNum)
    init()
    return () => {
      setQnaNum(null)
      seQnaCommentCountAtom(null)
    }
  }, [])

  if (!detailData) return
  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{detailData?.title}</h1>
            <Dl listData={setDescList} />
          </div>
          <div className="rgt">
            {/* top_content btn size :: large */}
            <ButtonMui disabled={!!answerData} type="contained" size="large" color="secondary" icon="DeleteIcon" onClick={deleteProcess}>
              Delete
            </ButtonMui>
            <ButtonMui disabled={!!answerData} type="contained" size="large" icon="EditIcon" onClick={() => router.push(`/helpdesk/qna/edit?qnaNum=${qnaNum}`)}>
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        {detailData && <QnaDetailAuthorContent detailData={detailData} />}
        {answerData && <QnaDetailAnswerContent answerData={answerData} />}
        <QnaDetailAnserCommentContent />
      </ContentBox>
    </>
  )
}

export default QnaDetailPage
