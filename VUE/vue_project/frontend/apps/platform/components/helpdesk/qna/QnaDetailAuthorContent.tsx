'use client'
import { FileCard } from 'ui'
import DetailBox from 'ui/components/helpdesk/DetailBox'
import DetailHeader from 'ui/components/helpdesk/DetailHeader'
import DetailCon from 'ui/components/helpdesk/DetailCon'
import { QnaDetailType } from '@type/qna'
import { createMarkup } from 'library/util'
import { useMemo } from 'react'

const QnaDetailAuthorContent = ({ detailData }: { detailData: QnaDetailType }) => {
  const getFilterStatus = [detailData?.type, detailData?.category, detailData?.module]

  const CkContentComponent = useMemo(
    () => detailData && <div className="ck-content" dangerouslySetInnerHTML={createMarkup(detailData?.content)} />,
    [detailData]
  )

  const getQnaStatus = () => {
    const obj = {
      WFR: 'pause',
      RSC: 'done',
      ASN: 'ongoing',
    }
    return obj[detailData?.qnaStatus]
  }

  return (
    <>
      <DetailHeader badgeTitle={getFilterStatus} status={detailData?.status} badgeStatus={getQnaStatus()} />

      <DetailCon>
        {detailData?.qnaAttachResponse.length > 0 && (
          <div className="mb_20">
            <ul className="align start mb_10">
              <li className="capH typo500">Attachment</li>
            </ul>
            {detailData?.qnaAttachResponse?.map((file, index) => (
              <FileCard file={file} key={index} icon={file.fileExtension}>
                {file.displayFileName}
              </FileCard>
            ))}
          </div>
        )}

        <DetailBox>{CkContentComponent}</DetailBox>
      </DetailCon>
    </>
  )
}

export default QnaDetailAuthorContent
