'use client'
import { useEffect, useMemo, useState } from 'react'
import { BaseInput, ButtonMui, MultiFileUpload } from 'ui'
import { isReplyAtom } from '@store/client/qna'
import dynamic from 'next/dynamic'
import { useSetAtom } from 'jotai'
import { AlertType, useAlert, useDragFileUpload } from 'library'
import { useQnaMuate } from '@store/server/useQnaQuery'
import { QnaDetailAnswerType } from '@type/qna'

const QnAnswerAddForm = ({ qnaAnswerData, qnaNum }: { qnaAnswerData: QnaDetailAnswerType; qnaNum: number }) => {
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])
  const setIsReply = useSetAtom(isReplyAtom)
  const { qnaPostAnswerMutate, qnaEditAnswerMutate } = useQnaMuate()
  const { alertOpen, alertClose } = useAlert()

  const [params, setParams] = useState({
    content: '',
  })
  const {
    dropRef,
    fileInputRef,
    isDragActive,
    count,
    drmValid,
    removeRef,
    setDrmValid,
    getfileSize,
    removeUploadCard,
    changeFileInput,
    uploadFiles,
    setUploadFiles,
  } = useDragFileUpload({
    tableName: 'TBD_QNA_ATCH',
  })

  const onChangeParam = (data: React.ChangeEvent<HTMLInputElement> | string, key) => {
    setParams((prev) => {
      return {
        ...prev,
        [key]: data,
      }
    })
  }
  const save = async () => {
    const param = {
      content: params.content,
      qnaAnswerAttachmentRequest: uploadFiles.map(({ fileNumber }) => ({ fileId: fileNumber })),
    }

    qnaAnswerData ? qnaEditAnswerMutate({ params: param, answerNumber: qnaAnswerData?.answerNumber, qnaNum }) : qnaPostAnswerMutate({ params: param, qnaNum })
  }

  const cancelAlert = () => {
    setParams({ content: '' })
    setIsReply(false)
  }

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'writing',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => cancelAlert()}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  useEffect(() => {
    if (qnaAnswerData) {
      setUploadFiles(qnaAnswerData?.answerAttachmentResponse)
      setParams({
        content: qnaAnswerData.answerContent,
      })
    }
  }, [])

  return (
    <>
      <>
        <hr className="mt_30 mb_30" />
        <div className="linecont blue">
          <div className="align top start mb_20">
            <span className="capH typo500 pt_12 pr_30">Attachment</span>
            <div style={{ marginLeft: '100px' }}>
              <MultiFileUpload
                isDragActive={isDragActive}
                dropRef={dropRef}
                setDrmValid={setDrmValid}
                removeRef={removeRef}
                drmValid={drmValid}
                fileInputRef={fileInputRef}
                count={count}
                getfileSize={getfileSize}
                removeUploadCard={removeUploadCard}
                changeFileInput={changeFileInput}
                uploadFiles={uploadFiles}
              />
            </div>
          </div>

          <div className="editor" style={{ background: '#fff' }}>
            <CKEditor
              data={params?.content}
              tableName="TBD_QNA_ATCH"
              onEditorChange={(data: string) => onChangeParam(data, 'content')}
              placeholder="Please enter content."
            />
          </div>
          <div className="cont_bottom_box">
            <div className="align end" style={{ border: 'none', paddingTop: '0px', marginTop: '20px' }}>
              <ButtonMui type="outlined" color="black" uiType="etc" size="medium" onClick={cancel}>
                Cancel
              </ButtonMui>
              <ButtonMui color="black" disabled={!params?.content?.trim()} type="contained" size="medium" onClick={save}>
                Add
              </ButtonMui>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default QnAnswerAddForm
