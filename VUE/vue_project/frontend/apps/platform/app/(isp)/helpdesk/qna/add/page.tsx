'use client'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'
import QnaEditorContent from '@components/helpdesk/qna/QnaEditorContent'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParamsData, FileListDataType, useAlert, AlertType } from 'library'
import { QnaAddInitParamsType } from '@type/qna'
import { useQnaMuate } from '@store/server/useQnaQuery'
import { checkedAtom } from '@store/client/qna'
import { useSetAtom } from 'jotai'

const pageTitleList = ['Help Desk', 'Inquiry'] // [QA] 변경요청

const initData = {
  type: '',
  category: '',
  module: '',
  title: '',
  content: '',
  openLevel: 'PRV',
}

const QnaAddPage = () => {
  const router = useRouter()
  const { params, resetParams } = useParamsData<QnaAddInitParamsType>(initData)
  const { qnaAddMutate, qnaAddLoading } = useQnaMuate()
  const setCheckedPrtnUser = useSetAtom(checkedAtom)

  const { alertOpen, alertAllClose } = useAlert()
  const alertState: AlertType = {
    icon: 'success',
    title: 'Inquiry has been submitted',
    isAllClose: true,
    textTitle: 'A notification will be sent when the representative answers.',
    content: (
      <div className="align center mt_30">
        <ButtonMui size="xlarge" onClick={() => router.replace('/helpdesk/qna')}>
          Move To List
        </ButtonMui>
      </div>
    ),
  }

  useEffect(() => {
    if (alertAllClose) {
      router.replace('/helpdesk/qna')
    }
  }, [alertAllClose])

  const addQna = async (files: FileListDataType) => {
    const param = {
      qnaAttachmentRequest: files.map(({ fileNumber }) => ({ fileId: fileNumber })),
      ...params,
    }

    if (params?.openLevel === 'PRV') {
      delete param.prtnUser
    }

    qnaAddMutate(
      { params: param },
      {
        onSuccess: () => {
          alertOpen(alertState)
        },
      }
    )
  }

  useEffect(() => {
    return () => {
      resetParams()
      setCheckedPrtnUser([])
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <Breadcrumb pageTitleList={pageTitleList} />
          <h1 className="headline1" onClick={() => alertOpen(alertState)}>
            {/* Add QnA */}
            Inquiry
          </h1>
        </ContentBox>
      </div>

      <QnaEditorContent qnaAddLoading={qnaAddLoading} addQna={addQna} />
    </>
  )
}

export default QnaAddPage
