'use client'
import { FileCard } from 'ui'
import DetailBox from 'ui/components/helpdesk/DetailBox'
import DetailHeader from 'ui/components/helpdesk/DetailHeader'
import DetailCon from 'ui/components/helpdesk/DetailCon'
import { QnaDetailType } from '@type/qna'
import { createMarkup } from 'library/util'
import { useMemo } from 'react'

const QnaDetailAuthorContent = ({ detailData }: { detailData: QnaDetailType }) => {
  const getFilterStatus = [detailData?.qnaTpCd, detailData?.qnaCatCd, detailData?.mdlTpCd]

  const getQnaStatus = (status: string) => {
    const obj = {
      WFR: 'pause',
      RSC: 'done',
      ASN: 'ongoing',
    }
    return obj[status]
  }

  const CkContentComponent = useMemo(
    () => detailData && <div className="ck-content" dangerouslySetInnerHTML={createMarkup(detailData?.inqrCont)} />,
    [detailData]
  )

  return (
    <>
      <DetailHeader isRight={false} badgeTitle={getFilterStatus} status={detailData?.qnaStsCd} badgeStatus={getQnaStatus(detailData.status)} />

      <DetailCon>
        {detailData?.qnaAttachResponse.length > 0 && (
          <div className="detail_file">
            <div className="viewcardgroup">
              <ul>
                <li>Attachment</li>
              </ul>
              {detailData?.qnaAttachResponse?.map((file, index) => (
                <FileCard file={file} key={index} icon={file.fileExtension}>
                  {file.displayFileName}
                </FileCard>
              ))}
            </div>
          </div>
        )}

        <DetailBox>{CkContentComponent}</DetailBox>
      </DetailCon>
    </>
  )
}

export default QnaDetailAuthorContent
