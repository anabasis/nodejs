import { Icons, DetailBox, DetailCon, DetailInfo, FileCard } from 'ui'
import { changeTimeLocal, createMarkup, downloadFiles } from 'library/util'
import { isEmptyCheck } from 'library'
import { QnaDetailAnswerType } from '@type/qna'
import { useMemo } from 'react'
const QnaDetailAnswerContent = ({ answerData }: { answerData: QnaDetailAnswerType }) => {
  const CkContentComponent = useMemo(
    () => answerData && <div className="ck-content" dangerouslySetInnerHTML={createMarkup(answerData?.answerContent)} />,
    [answerData]
  )
  return (
    <>
      {isEmptyCheck(answerData) && (
        <div className="mt_30 plr_16">
          <p className="title1 typo900 mb_10">
            <Icons.ReplyIcon width={24} height={25} fill="#2E3646" />
            {answerData?.title}
          </p>
          <DetailInfo>
            <div className="align start ">
              <dl className="item gap_10">
                <dt className="capH typo800">Date</dt>
                <dd className="caption typo700">{changeTimeLocal({ time: answerData?.createDate, type: 'yyyy-MM-dd' })}</dd>
              </dl>
              <dl className="item gap_10">
                <dt className="capH typo800">Update</dt>
                <dd className="caption typo700">{changeTimeLocal({ time: answerData?.modifyDate, type: 'yyyy-MM-dd' })}</dd>
              </dl>
              <dl className="item gap_10">
                <dt className="capH typo800">Creator</dt>
                <dd className="caption typo700">{answerData?.writer}</dd>
              </dl>
            </div>
          </DetailInfo>
          <DetailCon>
            {answerData?.answerAttachmentResponse?.length > 0 && (
              <div className="detail_file">
                <div className="viewcardgroup">
                  <ul>
                    <li className="capH typo600">Attachment</li>
                  </ul>
                  {answerData?.answerAttachmentResponse?.map((file, index) => (
                    <FileCard file={file} key={index} icon={file.fileExtension} onClick={() => downloadFiles(file)}>
                      {file.displayFileName}
                    </FileCard>
                  ))}
                </div>
              </div>
            )}

            <DetailBox answerBg>{CkContentComponent}</DetailBox>
          </DetailCon>
        </div>
      )}
    </>
  )
}

export default QnaDetailAnswerContent
