'use client'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'
import { useSearchParams, usePathname } from 'next/navigation'
import QnaDetailAuthorContent from '@components/helpdesk/qna/QnaDetailAuthorContent'
import QnaDetailAnswerContent from '@components/helpdesk/qna/QnaDetailAnswerContent'
import { useEffect } from 'react'
import QnAnswerAddForm from '@components/helpdesk/qna/QnAnswerAddForm'
import { useQnaAnswerData, useQnaDetailData } from '@store/server/useQnaQuery'
import { useAtom, useSetAtom } from 'jotai'
import { isReplyAtom, qnaNumAtom, qnaCommentCountAtom } from '@store/client/qna'
import QnaDetailAnserCommentContent from '@components/helpdesk/qna/QnaDetailAnserCommentContent'
import { addQnaManager } from '@api/qna'
import QnaTransferModal from '@components/helpdesk/qna/QnaTransferModal'
import { ModalType, useModal, useMenu } from 'library'

const pageTitleList = ['Help Desk', 'QnA Detail']

const QnaDetailPage = () => {
  const searchParams = useSearchParams()
  const setQnaNum = useSetAtom(qnaNumAtom)
  const seQnaCommentCountAtom = useSetAtom(qnaCommentCountAtom)
  const qnaNum = searchParams.get('qnaNum')
  const { modalOpen } = useModal()
  const [isReply, setIsReply] = useAtom(isReplyAtom)
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const { detailSuccess, qnaDetailData } = useQnaDetailData({ qnaNum })
  const { answerSuccess, qnaAnswerData } = useQnaAnswerData({ qnaNum })

  const getTransferModal: ModalType = {
    title: 'Transfer QnA in charge',
    textTitle: 'Please select the QnA category and module wish to transfer.',
    maxWidth: 's',
    linetitle: true,
    content: <QnaTransferModal qnaNum={qnaNum} />,
  }

  const addManage = async () => {
    try {
      await addQnaManager({ qnaNum })
      setIsReply(true)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setQnaNum(+qnaNum)
    return () => {
      setIsReply(false)
      seQnaCommentCountAtom(null)
      setQnaNum(null)
    }
  }, [])

  return (
    <>
      {detailSuccess && answerSuccess && (
        <>
          <div className="sticky_wrap">
            <ContentBox type="top_content">
              <div className="lft">
                <Breadcrumb pageTitleList={pageTitleList} />
                <h1 className="headline1">{qnaDetailData?.inqrTitl}</h1>
              </div>
              <div className="rgt">
                {/* top_content btn size :: large */}

                <ButtonMui
                  disabled={qnaAnswerData?.length > 0 || getPathInfo(pathname).uptYn !== 'Y'}
                  type="contained"
                  size="large"
                  color="secondary"
                  icon="TransferIcon"
                  onClick={() => modalOpen(getTransferModal)}
                >
                  Transfer In Change
                </ButtonMui>
                <ButtonMui
                  disabled={isReply || qnaAnswerData?.length > 0 || getPathInfo(pathname).uptYn !== 'Y'}
                  type="contained"
                  size="large"
                  icon="ReplyIcon"
                  iconStyle={{ fill: '#fff' }}
                  onClick={() => addManage()}
                >
                  Reply
                </ButtonMui>
              </div>
            </ContentBox>
          </div>
          <ContentBox>
            {qnaDetailData && <QnaDetailAuthorContent detailData={qnaDetailData} />}
            {isReply ? <QnAnswerAddForm qnaAnswerData={qnaAnswerData[0]} qnaNum={+qnaNum} /> : <QnaDetailAnswerContent answerData={qnaAnswerData[0]} />}
            <QnaDetailAnserCommentContent />
          </ContentBox>
        </>
      )}
    </>
  )
}

export default QnaDetailPage
